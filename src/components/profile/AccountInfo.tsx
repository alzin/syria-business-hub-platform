
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User } from '@/types';

interface AccountInfoProps {
  user: User;
}

const AccountInfo: React.FC<AccountInfoProps> = ({ user }) => {
  const { t } = useTranslation();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t('accountInformation')}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-medium text-gray-700">{t('accessLevel')}</label>
            <div className="mt-1">
              <Badge variant={user.accessLevel === 'verified' ? 'default' : 'secondary'}>
                {user.accessLevel.charAt(0).toUpperCase() + user.accessLevel.slice(1)}
              </Badge>
            </div>
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700">{t('accountStatus')}</label>
            <div className="mt-1">
              <Badge variant={user.verified ? 'default' : 'outline'}>
                {user.verified ? t('verified') : t('unverified')}
              </Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccountInfo;
