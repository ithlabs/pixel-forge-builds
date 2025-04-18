
-- Create a database function to handle user role creation with admin privileges
CREATE OR REPLACE FUNCTION public.create_user_role(user_id_param UUID, role_param user_role)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER -- This makes the function run with the privileges of the creator
AS $$
BEGIN
  INSERT INTO public.user_roles (user_id, role)
  VALUES (user_id_param, role_param);
END;
$$;

-- Grant execute permission on the function to authenticated users
GRANT EXECUTE ON FUNCTION public.create_user_role TO authenticated;
