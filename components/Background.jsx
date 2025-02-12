import Image from 'next/image';

const Background = () => {
  return (
    <Image
      src="/path/to/background.jpg"
      alt="Background"
      fill
      priority
      quality={100}
      className="background-container"
      sizes="100vw"
      style={{ 
        objectFit: 'cover',
        objectPosition: 'center',
        transform: 'translateZ(0)'  // Force GPU acceleration
      }}
    />
  );
};

export default Background; 