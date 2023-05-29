import { useState } from 'react';
import './App.css';
import { TwitterFollowCard } from './TwitterFollowCard';

export function App() {

 return (
  <section className='App'>
   <TwitterFollowCard isFollowing userName={'miduDev'} initialIsFollowing={false}>
   <strong>Miguel Angel Duran</strong>
   </TwitterFollowCard>

   <TwitterFollowCard isFollowing={false} userName='pheralb'>
    <strong>Pablo Hernandez</strong>
   </TwitterFollowCard>
  </section>
 )
}