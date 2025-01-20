import { useEffect, useState } from 'react';
import { Order } from '@/types/types';
import { Box } from '../ui/box';
import { Button, ButtonIcon, ButtonText } from '../ui/button';
import { Text } from '../ui/text';
import { ChevronDownIcon, ChevronUpIcon } from '../ui/icon';

type StatusSelectorProps = {
  order: Order;
  onUpdateStatus: (status: string, id: number) => void;
};

const StatusSelector: React.FC<StatusSelectorProps> = ({
  order,
  onUpdateStatus,
}) => {
  const [status, setStatus] = useState(order.status);
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleChange = (newStatus: string, id: number) => {
    setStatus(newStatus);
    onUpdateStatus(newStatus, id);
    setIsOpen(false);
  };

  useEffect(() => {
    setStatus(order.status);
  }, [order.status]);

  return (
    <Box className="relative">
      <Button
        onPress={() => setIsOpen(!isOpen)}
        className={`py-2 px-4 flex border rounded bg-typography-white`}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
      >
        <ButtonText className="text-typography-900 font-semibold">
          {status}
        </ButtonText>
        <ButtonIcon
          as={!isOpen ? ChevronDownIcon : ChevronUpIcon}
          color={isHovered ? 'white' : 'black'}
        />
      </Button>
      {isOpen && (
        <ul className="absolute z-50 mt-10 min-w-[80px] w-full bg-white border rounded shadow-lg">
          <li
            key={order.id + 'preparation'}
            className={`p-2 cursor-pointer ${
              status === 'pending' ? 'bg-state-200' : ''
            } hover:bg-slate-200`}
            onClick={() => handleChange('En cours', order.id)}
          >
            <Text>En cours</Text>
          </li>
          <li
            key={order.id + 'livraison'}
            className={`p-2 cursor-pointer ${
              status === 'processing' ? 'bg-yellow-100' : ''
            } hover:bg-yellow-100`}
            onClick={() => handleChange('Livraison', order.id)}
          >
            <Text>Livraison</Text>
          </li>
          <li
            key={order.id + 'livré'}
            className={`p-2 cursor-pointer ${
              status === 'shipped' ? 'bg-green-100' : ''
            } hover:bg-green-100`}
            onClick={() => handleChange('Livrée', order.id)}
          >
            <Text>Livrée</Text>
          </li>
          <li
            key={order.id + 'annulée'}
            className={`p-2 cursor-pointer ${
              status === 'shipped' ? 'bg-red-100' : ''
            } hover:bg-red-100`}
            onClick={() => handleChange('Annulée', order.id)}
          >
            <Text>Annulée</Text>
          </li>
        </ul>
      )}
    </Box>
  );
};

export default StatusSelector;
