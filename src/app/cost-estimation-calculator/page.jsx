import Link from 'next/link';
import React from 'react';

const MainRoute = () => {
  return (
    <div>
      <Link href='/cost-estimation-calculator/staff'>Staff</Link>
      <Link href='/cost-estimation-calculator/project'>Project</Link>
    </div>
  );
};
export default MainRoute;