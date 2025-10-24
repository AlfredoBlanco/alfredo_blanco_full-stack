'use client';
import { selectUser, setUserData } from '@/lib/features/user.slice';
import { RootState } from '@/lib/store';
import { redirect, usePathname } from 'next/navigation';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


interface stateInitializerProps {
  children: React.ReactNode;
}
const StateInitializer = ({ children }: stateInitializerProps) => {
  const dispatch = useDispatch();
  const { data: user } = useSelector(selectUser);
  const location = usePathname();

  useEffect(() => {
    if (!user && location !== '/login') {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) {
        redirect('/login');
      } else {
        const data = JSON.parse(storedUser);

        dispatch(setUserData({
          ...data,
          expires_in: Date.now() + (data.expires_in * 1000)
        }));
      }
    } else if (location === 'login') {
      redirect('/');
    }
  }, [user])

  return <>{children}</>;
};

export default StateInitializer;
