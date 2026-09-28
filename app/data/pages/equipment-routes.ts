import { routes as knives } from './elektronoji-dlya-rezki-konveyernih-lent-tehnicheskih-plastin/name-routers';
import { routes as screwConveyors } from './vintovye-konvejery/name-routers';
import { routes as screwTrough } from './vintovoy-konveyer-v-zhelobe/name-routers';
import { routes as screwTube } from './vintovoy-konveyer-v-trube/name-routers';
import { routes as screwFeeder } from './vintovoy-pitatel/name-routers';
import { routes as reservoirs } from './rezervuary/name-routers';
import { routes as silos } from './silosy/name-routers';
import { routes as rollerConveyors } from './rolgang/name-routers';
import { routes as firewoodConveyors } from './transporterdlyadrov/name-routers';
import { routes as scraperConveyors } from './konveyery-skrebkovye/name-routers';
import { routes as elevators } from './elevatory/name-routers';
import { routes as augers } from './shneki-konveera/name-routers';
import { routes as rotaryValves } from './shlyuzovyezatvory/name-routers';
import { routes as rotaryFeeders } from './shlyuzovye-pitateli-shp/name-routers';
import { routes as shp150 } from './shp-150/name-routers';
import { routes as shp200 } from './shp-200/name-routers';
import { routes as shp260 } from './shp-260/name-routers';
import { routes as shp300 } from './shp-300/name-routers';
import { routes as shp350 } from './shp-350/name-routers';
import { routes as shp400 } from './shp-400/name-routers';
import { routes as shp450 } from './shp-450/name-routers';
import { routes as shp500 } from './shp-500/name-routers';
import { routes as shpCustom } from './shp-nestandartnyh-razmerov/name-routers';
import { routes as conveyorParts } from './komplektuyushie-k-konvejeram/name-routers';
import { routes as cyclones } from './ciklony/name-routers';
import { routes as metalStructures } from './metallokonstruktsii-na-zakaz/name-routers';
import { routes as beltConveyors } from './lentochnye-konvejery/name-routers';
import { routes as conveyorTypes } from './konveyery-po-vidam/name-routers';
import { routes as beltFeeders } from './lentochnye-pitateli/name-routers';
import { routes as drums } from './barabany/name-routers';
import { routes as chainConveyors } from './cepnye-konveyeri/name-routers';
import { routes as buckets } from './kovshi/name-routers';
import { routes as conveyors } from './conveyors/name-routers';
import { routes as gConveyors } from './g-obraznye-lentochnye-konvejery/name-routers';
import { routes as horizontalConveyors } from './gorizontalnyj-lentochnyj-konvejer/name-routers';
import { routes as gravityConveyors } from './gravitatcionnyj-konvejery/name-routers';
import { routes as potatoConveyors } from './konvejery-dlya-kartofelya/name-routers';
import { routes as markingConveyors } from './konvejery-dlya-markirovki/name-routers';
import { routes as bagConveyors } from './konvejery-dlya-meshkov/name-routers';
import { routes as wasteConveyors } from './konvejery-dlya-othodov/name-routers';
import { routes as vegetableConveyors } from './konvejery-dlya-ovoshchey/name-routers';
import { routes as sandConveyors } from './konvejery-dlya-peska/name-routers';
import { routes as warehouseConveyors } from './konvejery-dlya-sklada/name-routers';
import { routes as sortingConveyors } from './konvejery-dlya-sortirovki/name-routers';
import { routes as coalConveyors } from './konvejery-dlya-uglya/name-routers';
import { routes as grainConveyors } from './konvejery-dlya-zerna/name-routers';
import { routes as packagingConveyors } from './konveyer-dlya-upakovki/name-routers';
import { routes as troughConveyors } from './konveyer-lentochnyy-zhelobchatyy/name-routers';
import { routes as modularConveyors } from './modulnye-konvejery/name-routers';
import { routes as inclinedConveyors } from './naklonnyj-lentochnyj-konvejer/name-routers';
import { routes as gravityRollers } from './neprivodnye-rolikovye-konveyery/name-routers';
import { routes as slatConveyors } from './plastinchatye-konvejery/name-routers';
import { routes as curveConveyors } from './povorotnye-lentochnye-konvejery/name-routers';
import { routes as poweredRollers } from './privodnye-rolikovye-konveyery/name-routers';
import { routes as expandableRollers } from './razdvizhnoj-rolgang/name-routers';
import { routes as rgs10 } from './rgs-10/name-routers';
import { routes as rgs100 } from './rgs-100/name-routers';
import { routes as rgs120 } from './rgs-120/name-routers';
import { routes as rgs15 } from './rgs-15/name-routers';
import { routes as rgs150 } from './rgs-150/name-routers';
import { routes as rgs20 } from './rgs-20/name-routers';
import { routes as rgs25 } from './rgs-25/name-routers';
import { routes as rgs3 } from './rgs-3/name-routers';
import { routes as rgs30 } from './rgs-30/name-routers';
import { routes as rgs40 } from './rgs-40/name-routers';
import { routes as rgs5 } from './rgs-5/name-routers';
import { routes as rgs50 } from './rgs-50/name-routers';
import { routes as rgs60 } from './rgs-60/name-routers';
import { routes as rgs75 } from './rgs-75/name-routers';
import { routes as conveyorRollers } from './rolikikonveyernye/name-routers';
import { routes as rollerSupports } from './rolikoopory/name-routers';
import { routes as ballTables } from './sharikovye-stoly/name-routers';
import { routes as constructionConveyors } from './stroitelnye-konvejery/name-routers';
import { routes as zConveyors } from './z-obraznyj-lentochnyj-konvejer/name-routers';
import { beltVariantRouteGroups } from './_shared/create-belt-variant-page';

const existingEquipmentRouteGroups = [
  knives,
  screwConveyors,
  screwTrough,
  screwTube,
  screwFeeder,
  reservoirs,
  silos,
  rollerConveyors,
  firewoodConveyors,
  scraperConveyors,
  elevators,
  augers,
  rotaryValves,
  rotaryFeeders,
  shp150,
  shp200,
  shp260,
  shp300,
  shp350,
  shp400,
  shp450,
  shp500,
  shpCustom,
  conveyorParts,
  cyclones,
  metalStructures,
  beltConveyors,
  conveyorTypes,
  beltFeeders,
  drums,
  chainConveyors,
  buckets,
  conveyors,
  gConveyors,
  horizontalConveyors,
  gravityConveyors,
  potatoConveyors,
  markingConveyors,
  bagConveyors,
  wasteConveyors,
  vegetableConveyors,
  sandConveyors,
  warehouseConveyors,
  sortingConveyors,
  coalConveyors,
  grainConveyors,
  packagingConveyors,
  troughConveyors,
  modularConveyors,
  inclinedConveyors,
  gravityRollers,
  slatConveyors,
  curveConveyors,
  poweredRollers,
  expandableRollers,
  rgs10,
  rgs100,
  rgs120,
  rgs15,
  rgs150,
  rgs20,
  rgs25,
  rgs3,
  rgs30,
  rgs40,
  rgs5,
  rgs50,
  rgs60,
  rgs75,
  conveyorRollers,
  rollerSupports,
  ballTables,
  constructionConveyors,
  zConveyors,
];

export const equipmentRouteGroups = [
  ...existingEquipmentRouteGroups,
  ...beltVariantRouteGroups.filter(
    (routes) => !existingEquipmentRouteGroups.some((existing) => existing.root === routes.root),
  ),
];

export const equipmentRouteSlugs = equipmentRouteGroups.flatMap(({ slugs }) => slugs);
