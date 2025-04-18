
import React, { useState, useEffect } from 'react';
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Settings, UserPlus } from "lucide-react";
import { UserProfile } from "@/types";

import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { InviteUserDialog } from '@/components/InviteUserDialog';

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showInviteDialog, setShowInviteDialog] = useState(false);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, email, first_name, last_name, phone, address');
      
      if (profilesError) throw profilesError;

      // Fetch roles for each profile
      const userProfiles = await Promise.all(
        profilesData.map(async (profile) => {
          const { data: roleData, error: roleError } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', profile.id)
            .single();

          if (roleError && roleError.code !== 'PGRST116') {
            console.error('Error fetching role:', roleError);
          }

          return {
            id: profile.id,
            email: profile.email || '',
            role: (roleData?.role as UserProfile['role']) || 'employee',
            first_name: profile.first_name,
            last_name: profile.last_name,
            phone: profile.phone,
            address: profile.address
          };
        })
      );

      setUsers(userProfiles);
    } catch (error: any) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: UserProfile['role']) => {
    try {
      // Get current session to check if the user is authenticated
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error('You must be logged in to update user roles');
        return;
      }

      const { error } = await supabase
        .from('user_roles')
        .update({ role: newRole })
        .eq('user_id', userId);

      if (error) throw error;
      
      toast.success(`User role updated to ${newRole}`);
      fetchUsers();
    } catch (error: any) {
      console.error('Error updating role:', error);
      toast.error('Failed to update user role');
    }
  };

  const handleInviteUser = async (
    email: string, 
    role: UserProfile['role'], 
    firstName: string, 
    lastName: string,
    phoneNumber: string,
    address: string,
    password: string
  ) => {
    try {
      // Check if the current user is authenticated
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        toast.error('You must be logged in to invite users');
        return;
      }
      
      // First, create the user with signup
      const { data, error } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true, // Auto-confirm the email
        user_metadata: { 
          first_name: firstName,
          last_name: lastName,
          phone: phoneNumber,
          address: address
        }
      });
      
      if (error) throw error;
      
      // If user is created successfully, set their role
      if (data && data.user) {
        // Create the profile record
        const { error: profileError } = await supabase
          .from('profiles')
          .upsert({
            id: data.user.id,
            email,
            first_name: firstName,
            last_name: lastName,
            phone: phoneNumber,
            address: address
          });
          
        if (profileError) throw profileError;
        
        // Add the role
        const { error: roleError } = await supabase.rpc('create_user_role', {
          user_id_param: data.user.id,
          role_param: role
        });
        
        if (roleError) throw roleError;
        
        toast.success(`Invitation sent to ${email}. A confirmation email has been sent to the user.`);
        setShowInviteDialog(false);
        fetchUsers();
      }
    } catch (error: any) {
      console.error('Error inviting user:', error);
      toast.error(error.message || 'Failed to invite user');
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <PageHeader 
          title="User Management" 
          description="Manage users and their roles in the ERP system"
        />
        <Button className="bg-construction-orange" onClick={() => setShowInviteDialog(true)}>
          <UserPlus className="mr-2 h-4 w-4" /> Invite User
        </Button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center">Loading users...</td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-4 text-center">No users found</td>
              </tr>
            ) : (
              users.map((user) => (
                <tr key={user.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.first_name} {user.last_name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{user.phone || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Select 
                      value={user.role} 
                      onValueChange={(newRole) => updateUserRole(user.id, newRole as UserProfile['role'])}
                    >
                      <SelectTrigger className="w-[180px]">
                        <SelectValue>{user.role}</SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="owner">Owner</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="manager">Manager</SelectItem>
                        <SelectItem value="employee">Employee</SelectItem>
                      </SelectContent>
                    </Select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Button variant="outline" size="sm">
                      <Settings className="h-4 w-4 mr-1" /> Manage
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <InviteUserDialog 
        isOpen={showInviteDialog} 
        onClose={() => setShowInviteDialog(false)} 
        onInvite={handleInviteUser} 
      />
    </div>
  );
};

export default UserManagement;
