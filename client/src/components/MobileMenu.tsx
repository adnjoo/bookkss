import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/20/solid';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';

import { SERVER_URL } from '../lib/helpers';
import { useUserStore } from '../zustand/store';

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

export function MobileMenu() {
  const user = useUserStore((state: any) => state.user);
  const setUser = useUserStore((state: any) => state.setUser);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get(`${SERVER_URL}/users/is-auth`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          // console.log(res);
          // alert(res.status);
          setUser(res.data.user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  return (
    <Menu as='div' className=''>
      <div className='flex items-center'>
        <Link to='/'>
          <img
            src='/logo-long.png'
            alt=''
            className='hidden w-32 rounded-full sm:flex'
          />
        </Link>
        <Menu.Button className='flex sm:hidden'>
          <img
            src='/logo-long.png'
            alt=''
            className='hidden w-32 rounded-full sm:flex'
          />
          <Bars3Icon
            className='-mr-1 h-5 w-5 text-gray-400 sm:hidden'
            aria-hidden='true'
          />
        </Menu.Button>
      </div>

      <Transition
        as={Fragment}
        enter='transition ease-out duration-100'
        enterFrom='transform opacity-0 scale-95'
        enterTo='transform opacity-100 scale-100'
        leave='transition ease-in duration-75'
        leaveFrom='transform opacity-100 scale-100'
        leaveTo='transform opacity-0 scale-95'
      >
        <Menu.Items className='absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='py-1'>
            {user && (
              <>
                <Menu.Item>
                  {({ active }: { active: boolean }) => (
                    <Link
                      to='/dashboard'
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      Dashboard
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }: { active: boolean }) => (
                    <Link
                      to='/archive'
                      className={classNames(
                        active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                        'block px-4 py-2 text-sm'
                      )}
                    >
                      Archive
                    </Link>
                  )}
                </Menu.Item>
              </>
            )}
            <Menu.Item>
              {({ active }: { active: boolean }) => (
                <Link
                  to='/discover'
                  className={classNames(
                    active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                    'block px-4 py-2 text-sm'
                  )}
                >
                  Discover
                </Link>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
