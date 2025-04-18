
-- Enable Row Level Security on user_roles table
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create policies for the user_roles table
-- Policy to allow selection of user's own role
CREATE POLICY "Users can read their own role"
ON public.user_roles
FOR SELECT
USING (auth.uid() = user_id);

-- Policy to allow admins and owners to read all roles
CREATE POLICY "Admins and owners can read all roles"
ON public.user_roles
FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND (role = 'admin' OR role = 'owner')
  )
);

-- Policy to allow admins and owners to update roles
CREATE POLICY "Admins and owners can update roles"
ON public.user_roles
FOR UPDATE
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND (role = 'admin' OR role = 'owner')
  )
);

-- Policy to allow admins and owners to delete roles
CREATE POLICY "Admins and owners can delete roles"
ON public.user_roles
FOR DELETE
USING (
  EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = auth.uid() AND (role = 'admin' OR role = 'owner')
  )
);

-- Only the create_user_role function can insert roles due to its SECURITY DEFINER attribute
