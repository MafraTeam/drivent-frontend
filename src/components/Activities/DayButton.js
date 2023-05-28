import { ReserveButton } from '../Dashboard/Payments';

export default function DayButton({ item }) {
  return (
    <ReserveButton> {item.dataFormatada.slice(0, item.dataFormatada.length - 5)}</ReserveButton>
  );
};
