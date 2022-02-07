import React from 'react';
import { useState, useEffect } from 'react'
import { API_FreeNews, API_Json } from '../api/API'
import { NewsCompProvider } from './TabNews/NewsComp';

export default function TabNews() {
  return (
  <NewsCompProvider>
    <News />
  </NewsCompProvider>
}
