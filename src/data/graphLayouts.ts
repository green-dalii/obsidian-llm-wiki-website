import type { ScenarioId } from '../i18n/locales/scenarios/types';

export interface GraphLayout {
  mainNodes: Array<{ x: number; y: number }>;
  t1Nodes: Array<{ x: number; y: number }>;
  t2Nodes: Array<{ x: number; y: number }>;
  t3Nodes: Array<{ x: number; y: number }>;
  satLinks: Array<{ x1: number; y1: number; x2: number; y2: number; opacity: number }>;
}

// Each scenario: 6 mainNodes + at most 1 satellite per tier.
// satLinks only connect satellites to their nearest main node.
function g(
  main: [number, number][],
  t1: [number, number][],
  t2: [number, number][],
  t3: [number, number][],
  slinks: [number, number, number, number, number][],
): GraphLayout {
  return {
    mainNodes: main.map(([x, y]) => ({ x, y })),
    t1Nodes: t1.map(([x, y]) => ({ x, y })),
    t2Nodes: t2.map(([x, y]) => ({ x, y })),
    t3Nodes: t3.map(([x, y]) => ({ x, y })),
    satLinks: slinks.map(([x1, y1, x2, y2, o]) => ({ x1, y1, x2, y2, opacity: o })),
  };
}

export function getGraphLayout(id: ScenarioId): GraphLayout {
  const layouts: Record<ScenarioId, GraphLayout> = {
    'daily-life': g(
      [[60,100],[240,50],[420,100],[130,240],[300,240],[460,230]],
      [[150,70]],
      [[380,140]],
      [[200,280]],
      [[150,70,60,100,8],[150,70,240,50,7],[380,140,420,100,8],[380,140,300,240,7],[200,280,130,240,8],[200,280,300,240,7]],
    ),
    reading: g(
      [[240,30],[80,120],[400,110],[40,250],[240,200],[430,230]],
      [[160,50]],
      [[380,90]],
      [[60,270]],
      [[160,50,240,30,8],[160,50,80,120,7],[380,90,400,110,8],[380,90,430,230,7],[60,270,40,250,8],[60,270,240,200,7]],
    ),
    inspiration: g(
      [[60,60],[420,60],[240,130],[60,240],[420,230],[240,280]],
      [[160,140]],
      [[240,200]],
      [[380,280]],
      [[160,140,60,60,8],[160,140,240,130,7],[240,200,240,130,8],[240,200,60,240,7],[380,280,420,230,8],[380,280,240,280,7]],
    ),
    creation: g(
      [[240,40],[80,150],[400,140],[160,260],[340,250],[460,260]],
      [[320,60]],
      [[120,190]],
      [[400,280]],
      [[320,60,240,40,8],[320,60,400,140,7],[120,190,80,150,8],[120,190,160,260,7],[400,280,340,250,8],[400,280,460,260,7]],
    ),
    academic: g(
      [[240,30],[420,90],[60,130],[260,180],[440,200],[80,260]],
      [[340,60]],
      [[200,220]],
      [[100,280]],
      [[340,60,240,30,8],[340,60,420,90,7],[200,220,260,180,8],[200,220,60,130,7],[100,280,80,260,8],[100,280,260,180,7]],
    ),
    business: g(
      [[130,50],[350,50],[60,180],[240,160],[420,170],[240,280]],
      [[200,60]],
      [[160,200]],
      [[340,290]],
      [[200,60,130,50,8],[200,60,350,50,7],[160,200,60,180,8],[160,200,240,160,7],[340,290,240,280,8],[340,290,420,170,7]],
    ),
  };
  return layouts[id];
}