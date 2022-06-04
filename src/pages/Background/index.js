import { configureStore } from '@reduxjs/toolkit';
import imageReducer from './imageSlice';
import {wrapStore} from 'webext-redux';
import React from 'react';

export const store = wrapStore(
  configureStore({
    reducer: {
      images: imageReducer,
    },
  })
);
