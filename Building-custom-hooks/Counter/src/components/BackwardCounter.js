import { useState, useEffect } from 'react';

import Card from './Card';
import { UseCounter } from '../hooks/UseCounter';

const BackwardCounter = () => {
  const { counter } = UseCounter(false);
  return <Card>{counter}</Card>;
};

export default BackwardCounter;
