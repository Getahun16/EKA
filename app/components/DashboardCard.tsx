type Props = {
  title: string;
  value: string;
};

export default function DashboardCard({ title, value }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h4 className="text-sky-600 font-semibold mb-2">{title}</h4>
      <p className="text-2xl font-bold text-gray-900 text-center">{value}</p>
    </div>
  );
}
