import { useState, useEffect } from 'react';

import Card from './Card';
import { UseCounter } from '../hooks/UseCounter';

const ForwardCounter = () => {
  const { counter } = UseCounter();
  return <Card>{counter}</Card>;
};

export default ForwardCounter;
