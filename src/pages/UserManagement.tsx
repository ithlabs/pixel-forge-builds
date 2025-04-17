
import React, { useState, useEffect } from 'react';
import { PageHeader } from "@/components/PageHeader";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Plus, Settings } from "lucide-react";

import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { InviteUserDialog } from '@/components/InviteUserDialog';

type UserRole = 'owner' | 'admin' | 'manager' | 'employee';

type UserProfile = {
  id: string;
  email: string;
  role: UserRole;
  first_name: string | null;
  last_name: string | null;
};

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<UserProfile[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showInviteDialog, setShowInviteDialog] = useState(false);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const { data: { users: authUsers }, error } = await supabase.auth.admin.listUsers();
      
      if (error) throw error;

      const userProfiles = await Promise.all(
        authUsers.map(async (user) => {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('first_name, last_name')
            .eq('id', user.id)
            .single();

          const { data: roleData } = await supabase
            .from('user_roles')
            .select('role')
            .eq('user_id', user.id)
            .single();

          return {
            id: user.id,
            email: user.email || '',
            role: (roleData?.role as UserRole) || 'employee',
            first_name: profileData?.first_name || null,
            last_name: profileData?.last_name || null,
          };
        })
      );

      setUsers(userProfiles);
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to fetch users');
    } finally {
      setIsLoading(false);
    }
  };

  const updateUserRole = async (userId: string, newRole: UserRole) => {
    try {
      const { error } = await supabase
        .from('user_roles')
        .update({ role: newRole })
        .eq('user_id', userId);

      if (error) throw error;
      
      toast.success(`User role updated to ${newRole}`);
      fetchUsers();
    } catch (error) {
      console.error('Error updating role:', error);
      toast.error('Failed to update user role');
    }
  };

  const handleInviteUser = async (email: string, role: UserRole, firstName: string, lastName: string) => {
    try {
      // First, create the user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.admin.inviteUserByEmail(
        email, 
        { 
          data: { 
            first_name: firstName,
            last_name: lastName
          } 
        }
      );
      
      if (authError) throw authError;
      
      toast.success(`Invitation sent to ${email}`);
      fetchUsers();
      setShowInviteDialog(false);
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
          <Plus className="mr-2 h-4 w-4" /> Invite User
        </Button>
      </div>

      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  {user.first_name} {user.last_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <Select 
                    value={user.role} 
                    onValueChange={(newRole) => updateUserRole(user.id, newRole as UserRole)}
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
                  {/* Future action buttons like delete, reset password */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invite User Dialog */}
      <InviteUserDialog 
        isOpen={showInviteDialog} 
        onClose={() => setShowInviteDialog(false)} 
        onInvite={handleInviteUser} 
      />
    </div>
  );
};

export default UserManagement;
