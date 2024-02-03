export default function ButtonAtom({ className, ...props }: any) {
  return (
    <>
    <button
        {...props} 
        className={`global__button ${className}`}
      />
    </>    
  );
}