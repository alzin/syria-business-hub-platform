
const Logo = ({ className = "w-12 h-12" }: { className?: string }) => {
  return (
    <div className="flex items-center">
      <img 
        src="/logo.png" 
        alt="SyrVest Logo" 
        className={className}
      />
    </div>
  );
};

export default Logo;
