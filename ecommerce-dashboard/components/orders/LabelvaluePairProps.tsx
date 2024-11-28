import { HStack } from '@/components/ui/hstack';
import { Text } from '@/components/ui/text';
import { LabelValuePairProps } from '@/types/types';

const LabelValuePair: React.FC<LabelValuePairProps> = ({
  label,
  value,
  isSmallScreen,
}) => {
  return (
    <HStack className="justify-between items-center">
      <Text
        size={isSmallScreen ? 'xs' : 'md'}
        className="font-semibold text-typography-800"
      >
        {label}
      </Text>
      <Text size={isSmallScreen ? 'xs' : 'md'}>{value}</Text>
    </HStack>
  );
};

export default LabelValuePair;
