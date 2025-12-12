import React from 'react';
import { Building2, User, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import { UserRole } from '@/types/auth';

interface RoleSelectorProps {
  selectedRole: UserRole;
  onRoleChange: (role: UserRole) => void;
}

const roles: { value: UserRole; label: string; icon: React.ElementType; description: string }[] = [
  { value: 'clinic', label: 'Clinic', icon: Building2, description: 'Healthcare provider' },
  { value: 'patient', label: 'Patient', icon: User, description: 'Monitor your health' },
  { value: 'family', label: 'Family', icon: Users, description: 'Caregiver access' },
];

export const RoleSelector: React.FC<RoleSelectorProps> = ({ selectedRole, onRoleChange }) => {
  return (
    <div className="grid grid-cols-3 gap-3">
      {roles.map((role) => {
        const Icon = role.icon;
        const isSelected = selectedRole === role.value;
        
        return (
          <button
            key={role.value}
            type="button"
            onClick={() => onRoleChange(role.value)}
            className={cn(
              "flex flex-col items-center p-4 rounded-xl border-2 transition-all duration-300",
              isSelected
                ? "border-primary bg-primary/10 shadow-lg"
                : "border-border bg-secondary/30 hover:border-primary/50 hover:bg-secondary/50"
            )}
          >
            <div
              className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all duration-300",
                isSelected ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
              )}
            >
              <Icon className="w-6 h-6" />
            </div>
            <span className={cn("font-medium text-sm", isSelected && "text-primary")}>
              {role.label}
            </span>
            <span className="text-xs text-muted-foreground mt-1">{role.description}</span>
          </button>
        );
      })}
    </div>
  );
};
