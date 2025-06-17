
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { usePhoneVerification } from '@/hooks/usePhoneVerification';
import { CheckCircle, Clock, Phone } from 'lucide-react';

interface PhoneVerificationProps {
  userId: string;
  phoneNumber: string;
  phoneCountryCode: string;
  isVerified: boolean;
  onVerificationComplete?: () => void;
  showCard?: boolean;
}

const PhoneVerification: React.FC<PhoneVerificationProps> = ({
  userId,
  phoneNumber,
  phoneCountryCode,
  isVerified,
  onVerificationComplete,
  showCard = true
}) => {
  const { t } = useTranslation();
  const {
    isLoading,
    verificationCode,
    setVerificationCode,
    isCodeSent,
    timeLeft,
    requestVerification,
    verifyCode,
    formatTime,
  } = usePhoneVerification();

  const handleRequestCode = () => {
    const fullPhoneNumber = `${phoneCountryCode}${phoneNumber}`;
    requestVerification(userId, fullPhoneNumber);
  };

  const handleVerifyCode = async () => {
    const success = await verifyCode(userId, verificationCode);
    if (success && onVerificationComplete) {
      onVerificationComplete();
    }
  };

  const content = (
    <>
      <div className="flex items-center gap-2 mb-4">
        <Phone className="w-5 h-5" />
        <span className="font-medium">
          {phoneCountryCode} {phoneNumber}
        </span>
        {isVerified ? (
          <Badge variant="default" className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            Verified
          </Badge>
        ) : (
          <Badge variant="secondary">
            Not Verified
          </Badge>
        )}
      </div>

      {!isVerified && (
        <div className="space-y-4">
          {!isCodeSent ? (
            <Button 
              onClick={handleRequestCode}
              disabled={isLoading || !phoneNumber}
              className="w-full"
            >
              {isLoading ? 'Sending...' : 'Send Verification Code'}
            </Button>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Code expires in {formatTime(timeLeft)}</span>
              </div>
              
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Enter 6-digit verification code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  maxLength={6}
                  disabled={isLoading}
                />
                
                <div className="flex gap-2">
                  <Button 
                    onClick={handleVerifyCode}
                    disabled={isLoading || verificationCode.length !== 6}
                    className="flex-1"
                  >
                    {isLoading ? 'Verifying...' : 'Verify Code'}
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={handleRequestCode}
                    disabled={isLoading || timeLeft > 0}
                  >
                    Resend
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );

  if (!showCard) {
    return <div className="space-y-4">{content}</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Phone className="w-5 h-5" />
          Phone Verification
        </CardTitle>
        <CardDescription>
          Verify your phone number to enhance your account security
        </CardDescription>
      </CardHeader>
      <CardContent>
        {content}
      </CardContent>
    </Card>
  );
};

export default PhoneVerification;
