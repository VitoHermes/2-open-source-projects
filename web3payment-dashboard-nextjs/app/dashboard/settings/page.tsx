'use client';

import { useCallback, useRef, useState } from 'react';

import { Input, Slider } from '@mui/material';

import { Button } from '@/app/ui/button';
import Game from './game';

export default function Page() {
  // input reference
  const inputRef = useRef<HTMLInputElement>(null);
  const inputRef2 = useRef<HTMLInputElement>(null);
  const focusInput = () => {
    // 对于 Material-UI Input，需要访问内部的 input 元素
    const inputElement = inputRef.current?.querySelector('input');
    if (inputElement) {
      inputElement.focus();
    }
  };

  const focutinput2 = () => {
    const inputElement = inputRef2.current?.querySelector('input');
    if (inputElement) {
      inputElement.focus();
    }
  }

  // add numbers function
  const [count, setCount] = useState(0);
  const addNumber = (a: number, b: number) => {
    return a + b;
  };

  const addNumbers = (numbers: number[]) => {
    return numbers.reduce((acc, curr) => acc + curr, 0);
  };

  const addNumbers2 = (numbers: number[]) => {
    let sum = 0;
    for (let i = 0; i < numbers.length; i++) {
      sum += numbers[i];
    }
    return sum;
  };

  const mulNumbers = (numbers: number[]) => {
    return numbers.reduce((acc, curr) => acc * curr, 1);
  };

  // string matching function
  const [matchString, setMatchString] = useState<string[]>([]);
  const [searchString, setSearchString] = useState('');
  const setDic = () => {
    const dic = ['apple', 'banana', 'cherry'];
    setMatchString(dic);
  };
  const inInDic = (str: string) => {
    const words = str.toLowerCase().split('');
    const replaceStar = words.map(word => (word === '*' ? '' : word));
    if (words.includes('*')) {
      for (const item of matchString) {
        if (item.includes(replaceStar.join(''))) {
          return true;
        }
      }
      return false;
    }
    return matchString.includes(str);
  };

  // wordle function
  const API_URL = 'https://random-word-api.herokuapp.com/word?number=500&length=5';
  const [randomWord, setRandomWord] = useState('');
  const [guessWord, setGuessWord] = useState('');
  const [guessedWords, setGuessedWords] = useState<string[]>([]);

  const fetchWords = useCallback(async () => {
    const words = await fetch(API_URL).then(res => res.json());
    const randomWord = words[Math.floor(Math.random() * words.length)];
    setRandomWord(randomWord);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  const checkWord = useCallback((word: string) => {
    if (word.length !== 5) {
      return;
    }
    setGuessedWords([...guessedWords, word]);
    if (word === randomWord) {
      setGuessedWords([]);
    }
  }, []);

  // account
  const [account, setAccount] = useState(0);

  // map render
  const products = [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 },
    { id: 3, name: 'Product 3', price: 300 },
  ];

  const renderProducts = products.map(product => (
    <li key={product.id}>
      <div>{product.name}</div>
      <div>{product.price}</div>
    </li>
  ));

  return (
    <div className="flex flex-col gap-4">
      <div>Question 1</div>
      <div>Count: {count}</div>
      <div className="flex gap-4">
        <Button type="button" onClick={() => setCount(addNumber(1, 2))}>
          Add two numbers
        </Button>
        <Button type="button" onClick={() => setCount(addNumbers([1, 2, 3]))}>
          Add more numbers
        </Button>
        <Button type="button" onClick={() => setCount(addNumbers2([1, 2, 3, 4, 5]))}>
          Add more numbers 2
        </Button>
        <Button type="button" onClick={() => setCount(mulNumbers([1, 2, 3, 4, 5]))}>
          Multiply numbers
        </Button>
      </div>
      <Slider
        aria-label="Temperature"
        value={count}
        className="!w-[300px]"
        onChange={(event, newValue) => setCount(newValue as number)}
        valueLabelDisplay="auto"
        min={0}
        max={50}
      />
      <div>Question 2</div>
      <div>
        {matchString.map(str => (
          <div key={str}>{str}</div>
        ))}
      </div>
      <div className="flex gap-4">
        <Button type="button" onClick={setDic}>
          Set Dictionary
        </Button>
        <Button type="button" onClick={() => setMatchString([])}>
          Clear Dictionary
        </Button>
      </div>
      <div className="flex gap-4">
        <Input type="text" value={searchString} onChange={e => setSearchString(e.target.value)} />
        <div>
          {searchString} is {inInDic(searchString) ? 'In dictionary' : 'Not in dictionary'}
        </div>
      </div>
      <Slider />
      <div>Question 3 Wordle</div>
      <div>Random Word: {randomWord}</div>
      <Input type="text" value={guessWord} onChange={e => setGuessWord(e.target.value)} />
      <Button type="button" onClick={() => checkWord(guessWord)}>
        Check Word
      </Button>
      <Button type="button" onClick={() => fetchWords()}>
        Generate Random Word
      </Button>
      <div>Question 4</div>
      <ul>{renderProducts}</ul>
      <div>Account: {account}</div>
      <Button type="button" onClick={() => setAccount(count + 1)}>
        Add Account
      </Button>
      <Game />
      <div>Question 5</div>
      <Input type="text" ref={inputRef} />
      <Button type="button" onClick={focusInput}>
        Focus Input
      </Button>
      <Input type="text" ref={inputRef2} />
      <Button type="button" onClick={focutinput2}>
        Focus Input 2
      </Button>
    </div>
  );
}
