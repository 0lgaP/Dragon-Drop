const npc = [
  {id: '2c9267a4-2dbf-4ce4-91b3-ae6a514fa795', img: null, campaign_id: '8a89386b-de43-4c63-9127-3a78394d4253', name: 'Merla Brushgather', alive: true },
  {id: 'c6b15ff4-eba6-4d07-b885-6bf54f935e65', img: null, campaign_id: '8a89386b-de43-4c63-9127-3a78394d4253', name: 'Morty', alive: true },
  {id: 'a1830913-9213-464c-8139-485ba7238d7c', img: null, campaign_id: '8a89386b-de43-4c63-9127-3a78394d4253', name: 'Orsik Ironfist', alive: true },
  {id: '74c7ec40-45d9-46e5-8ab3-cd2f1448fe1d', img: null, campaign_id: '8a89386b-de43-4c63-9127-3a78394d4253', name: 'Eryn Tharivol', alive: true },
  {id: '6f83b2c1-7a35-431c-b6f7-b8998945c478', img: null, campaign_id: 'b819024a-4fd2-4316-8697-411ad293bb71', name: 'Ash Ketchum', alive: true },
  {id: '315cbe8a-8bff-4e02-aa73-adeb16193374', img: null, campaign_id: 'b819024a-4fd2-4316-8697-411ad293bb71', name: 'Jesse', alive: true },
  {id: '753edd75-7cda-4953-a1fb-f160e7330c7b', img: null, campaign_id: 'b819024a-4fd2-4316-8697-411ad293bb71', name: 'James', alive: true },
  {id: 'c6f18a16-9d2e-4ec7-995c-be066f95b2d7', img: null, campaign_id: 'b819024a-4fd2-4316-8697-411ad293bb71', name: 'Meowth', alive: true}
]

function getNpcNames(dataArray) {
  const nameArray = dataArray.map(npc => npc.name)
  return nameArray
}

console.log(getNpcNames(npc))