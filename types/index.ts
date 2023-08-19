export type Organization = {
    id?: number
    name: string
    orgInfo?: object
}

export type User = {
  id?: number
  organizationId: number
  roleId?: number        
  firstName: string     
  middleName?: string    
  lastName: string      
  email: string         
  password: string      
  phone?: string         
  userInfo?: object      
  isSuperAdmin?: boolean  
  isAdmin?: boolean       
  isSubAdmin?: boolean
  status?: boolean
  softDelete?: boolean    
}

export type PermissionComponent =  {
    id?: number
    name: string
}

export type Permissions =  {
    id?: number
    roleId: number
    permissionComponentId: number
    view: boolean
    add: boolean
    update: boolean
    remove: boolean
}