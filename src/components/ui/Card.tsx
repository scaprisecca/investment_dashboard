export const Card: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      {children}
    </div>
  );
}; 