// ── tanks.js — tank type catalogue ─────────────────────
//
//  speed  — pixels/frame the tank moves
//  bspd   — pixels/frame the bullet travels
//  hp     — hit points (each bullet removes 1)
//  size   — sprite footprint in pixels (square)
//  cd     — cooldown frames between shots (lower = faster RoF)
//  desc   — one-liner shown on the select card

const TANKS = [
    { name: 'Scout',   speed: 4, bspd: 9,  hp: 2, size: 20, cd: 20, desc: 'Quick & nimble'       },
    { name: 'Ranger',  speed: 3, bspd: 11, hp: 2, size: 24, cd: 14, desc: 'Rapid-fire specialist' },
    { name: 'Soldier', speed: 3, bspd: 6,  hp: 3, size: 26, cd: 22, desc: 'Balanced class'        },
    { name: 'Heavy',   speed: 2, bspd: 5,  hp: 6, size: 32, cd: 35, desc: 'Armoured & slow'       },
    { name: 'Speeder', speed: 5, bspd: 7,  hp: 2, size: 22, cd: 18, desc: 'Blazing fast'          },
    { name: 'Brute',   speed: 1, bspd: 4,  hp: 9, size: 38, cd: 44, desc: 'Near unkillable'       },
];
