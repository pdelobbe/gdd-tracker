import type { Product } from '../types'

export const SEED_PRODUCTS: Product[] = [
  {
    id: 'primo-maxx',
    name: 'Primo Maxx / T-Nex',
    activeIngredient: 'Trinexapac-ethyl',
    manufacturer: 'Syngenta / Quali-Pro',
    description:
      'The most widely used PGR in turfgrass management. Inhibits gibberellin biosynthesis to reduce vertical growth, increase tillering, and improve turf density and color.',
    grassProfiles: [
      // Cool-season grasses
      { grassType: 'kentucky_bluegrass', mowingHeight: 'low', gddThreshold: 200, rateOzPer1000SqFt: 0.38 },
      { grassType: 'kentucky_bluegrass', mowingHeight: 'medium', gddThreshold: 250, rateOzPer1000SqFt: 0.38 },
      { grassType: 'kentucky_bluegrass', mowingHeight: 'high', gddThreshold: 300, rateOzPer1000SqFt: 0.44 },
      { grassType: 'perennial_ryegrass', mowingHeight: 'low', gddThreshold: 200, rateOzPer1000SqFt: 0.38 },
      { grassType: 'perennial_ryegrass', mowingHeight: 'medium', gddThreshold: 250, rateOzPer1000SqFt: 0.38 },
      { grassType: 'perennial_ryegrass', mowingHeight: 'high', gddThreshold: 300, rateOzPer1000SqFt: 0.44 },
      { grassType: 'tall_fescue', mowingHeight: 'low', gddThreshold: 250, rateOzPer1000SqFt: 0.38 },
      { grassType: 'tall_fescue', mowingHeight: 'medium', gddThreshold: 300, rateOzPer1000SqFt: 0.44 },
      { grassType: 'tall_fescue', mowingHeight: 'high', gddThreshold: 350, rateOzPer1000SqFt: 0.44 },
      { grassType: 'fine_fescue', mowingHeight: 'low', gddThreshold: 200, rateOzPer1000SqFt: 0.38 },
      { grassType: 'fine_fescue', mowingHeight: 'medium', gddThreshold: 250, rateOzPer1000SqFt: 0.38 },
      { grassType: 'fine_fescue', mowingHeight: 'high', gddThreshold: 300, rateOzPer1000SqFt: 0.44 },
      { grassType: 'creeping_bentgrass', mowingHeight: 'low', gddThreshold: 200, rateOzPer1000SqFt: 0.22 },
      { grassType: 'creeping_bentgrass', mowingHeight: 'medium', gddThreshold: 250, rateOzPer1000SqFt: 0.30 },
      { grassType: 'creeping_bentgrass', mowingHeight: 'high', gddThreshold: 300, rateOzPer1000SqFt: 0.38 },
      // Warm-season — Common Bermuda (label rates)
      { grassType: 'bermudagrass', mowingHeight: 'low', gddThreshold: 250, rateOzPer1000SqFt: 0.75 },
      { grassType: 'bermudagrass', mowingHeight: 'medium', gddThreshold: 275, rateOzPer1000SqFt: 0.75 },
      { grassType: 'bermudagrass', mowingHeight: 'high', gddThreshold: 300, rateOzPer1000SqFt: 0.75 },
      // Tifway 419 (label rates)
      { grassType: 'bermuda_tifway419', mowingHeight: 'low', gddThreshold: 220, rateOzPer1000SqFt: 0.38 },
      { grassType: 'bermuda_tifway419', mowingHeight: 'medium', gddThreshold: 235, rateOzPer1000SqFt: 0.38 },
      { grassType: 'bermuda_tifway419', mowingHeight: 'high', gddThreshold: 250, rateOzPer1000SqFt: 0.38 },
      // TifTuf (label rates)
      { grassType: 'bermuda_tiftuf', mowingHeight: 'low', gddThreshold: 220, rateOzPer1000SqFt: 0.38 },
      { grassType: 'bermuda_tiftuf', mowingHeight: 'medium', gddThreshold: 235, rateOzPer1000SqFt: 0.38 },
      { grassType: 'bermuda_tiftuf', mowingHeight: 'high', gddThreshold: 250, rateOzPer1000SqFt: 0.38 },
      // Celebration (label rates)
      { grassType: 'bermuda_celebration', mowingHeight: 'low', gddThreshold: 220, rateOzPer1000SqFt: 0.25 },
      { grassType: 'bermuda_celebration', mowingHeight: 'medium', gddThreshold: 250, rateOzPer1000SqFt: 0.25 },
      { grassType: 'bermuda_celebration', mowingHeight: 'high', gddThreshold: 275, rateOzPer1000SqFt: 0.25 },
      // Tahoma 31 (label rates)
      { grassType: 'bermuda_tahoma31', mowingHeight: 'low', gddThreshold: 275, rateOzPer1000SqFt: 0.13 },
      { grassType: 'bermuda_tahoma31', mowingHeight: 'medium', gddThreshold: 310, rateOzPer1000SqFt: 0.17 },
      { grassType: 'bermuda_tahoma31', mowingHeight: 'high', gddThreshold: 350, rateOzPer1000SqFt: 0.20 },
      // Other warm-season
      { grassType: 'zoysiagrass', mowingHeight: 'low', gddThreshold: 250, rateOzPer1000SqFt: 0.38 },
      { grassType: 'zoysiagrass', mowingHeight: 'medium', gddThreshold: 300, rateOzPer1000SqFt: 0.44 },
      { grassType: 'zoysiagrass', mowingHeight: 'high', gddThreshold: 350, rateOzPer1000SqFt: 0.44 },
      { grassType: 'st_augustinegrass', mowingHeight: 'medium', gddThreshold: 300, rateOzPer1000SqFt: 0.44 },
      { grassType: 'st_augustinegrass', mowingHeight: 'high', gddThreshold: 350, rateOzPer1000SqFt: 0.44 },
      { grassType: 'buffalograss', mowingHeight: 'medium', gddThreshold: 300, rateOzPer1000SqFt: 0.38 },
      { grassType: 'buffalograss', mowingHeight: 'high', gddThreshold: 350, rateOzPer1000SqFt: 0.44 },
      { grassType: 'centipedegrass', mowingHeight: 'medium', gddThreshold: 300, rateOzPer1000SqFt: 0.38 },
      { grassType: 'centipedegrass', mowingHeight: 'high', gddThreshold: 350, rateOzPer1000SqFt: 0.44 },
    ],
  },
  {
    id: 'anuew',
    name: 'Anuew',
    activeIngredient: 'Prohexadione calcium',
    manufacturer: 'Nufarm',
    description:
      'A newer PGR with a shorter regulation window. Offers quick suppression with faster recovery, making it ideal for situations where flexibility is needed.',
    grassProfiles: [
      { grassType: 'kentucky_bluegrass', mowingHeight: 'low', gddThreshold: 175, rateOzPer1000SqFt: 0.28 },
      { grassType: 'kentucky_bluegrass', mowingHeight: 'medium', gddThreshold: 200, rateOzPer1000SqFt: 0.28 },
      { grassType: 'kentucky_bluegrass', mowingHeight: 'high', gddThreshold: 225, rateOzPer1000SqFt: 0.34 },
      { grassType: 'perennial_ryegrass', mowingHeight: 'low', gddThreshold: 175, rateOzPer1000SqFt: 0.28 },
      { grassType: 'perennial_ryegrass', mowingHeight: 'medium', gddThreshold: 200, rateOzPer1000SqFt: 0.28 },
      { grassType: 'perennial_ryegrass', mowingHeight: 'high', gddThreshold: 225, rateOzPer1000SqFt: 0.34 },
      { grassType: 'tall_fescue', mowingHeight: 'low', gddThreshold: 200, rateOzPer1000SqFt: 0.28 },
      { grassType: 'tall_fescue', mowingHeight: 'medium', gddThreshold: 225, rateOzPer1000SqFt: 0.34 },
      { grassType: 'tall_fescue', mowingHeight: 'high', gddThreshold: 275, rateOzPer1000SqFt: 0.34 },
      { grassType: 'fine_fescue', mowingHeight: 'low', gddThreshold: 175, rateOzPer1000SqFt: 0.28 },
      { grassType: 'fine_fescue', mowingHeight: 'medium', gddThreshold: 200, rateOzPer1000SqFt: 0.28 },
      { grassType: 'fine_fescue', mowingHeight: 'high', gddThreshold: 225, rateOzPer1000SqFt: 0.34 },
      { grassType: 'creeping_bentgrass', mowingHeight: 'low', gddThreshold: 150, rateOzPer1000SqFt: 0.18 },
      { grassType: 'creeping_bentgrass', mowingHeight: 'medium', gddThreshold: 175, rateOzPer1000SqFt: 0.22 },
      { grassType: 'creeping_bentgrass', mowingHeight: 'high', gddThreshold: 200, rateOzPer1000SqFt: 0.28 },
      // Common Bermuda
      { grassType: 'bermudagrass', mowingHeight: 'low', gddThreshold: 200, rateOzPer1000SqFt: 0.34 },
      { grassType: 'bermudagrass', mowingHeight: 'medium', gddThreshold: 250, rateOzPer1000SqFt: 0.34 },
      { grassType: 'bermudagrass', mowingHeight: 'high', gddThreshold: 275, rateOzPer1000SqFt: 0.34 },
      // Tifway 419
      { grassType: 'bermuda_tifway419', mowingHeight: 'low', gddThreshold: 175, rateOzPer1000SqFt: 0.34 },
      { grassType: 'bermuda_tifway419', mowingHeight: 'medium', gddThreshold: 200, rateOzPer1000SqFt: 0.34 },
      { grassType: 'bermuda_tifway419', mowingHeight: 'high', gddThreshold: 220, rateOzPer1000SqFt: 0.34 },
      // TifTuf
      { grassType: 'bermuda_tiftuf', mowingHeight: 'low', gddThreshold: 175, rateOzPer1000SqFt: 0.34 },
      { grassType: 'bermuda_tiftuf', mowingHeight: 'medium', gddThreshold: 200, rateOzPer1000SqFt: 0.34 },
      { grassType: 'bermuda_tiftuf', mowingHeight: 'high', gddThreshold: 220, rateOzPer1000SqFt: 0.34 },
      // Celebration
      { grassType: 'bermuda_celebration', mowingHeight: 'low', gddThreshold: 175, rateOzPer1000SqFt: 0.34 },
      { grassType: 'bermuda_celebration', mowingHeight: 'medium', gddThreshold: 215, rateOzPer1000SqFt: 0.34 },
      { grassType: 'bermuda_celebration', mowingHeight: 'high', gddThreshold: 240, rateOzPer1000SqFt: 0.34 },
      // Tahoma 31
      { grassType: 'bermuda_tahoma31', mowingHeight: 'low', gddThreshold: 220, rateOzPer1000SqFt: 0.34 },
      { grassType: 'bermuda_tahoma31', mowingHeight: 'medium', gddThreshold: 260, rateOzPer1000SqFt: 0.34 },
      { grassType: 'bermuda_tahoma31', mowingHeight: 'high', gddThreshold: 300, rateOzPer1000SqFt: 0.34 },
      // Other warm-season
      { grassType: 'zoysiagrass', mowingHeight: 'low', gddThreshold: 200, rateOzPer1000SqFt: 0.28 },
      { grassType: 'zoysiagrass', mowingHeight: 'medium', gddThreshold: 250, rateOzPer1000SqFt: 0.34 },
      { grassType: 'zoysiagrass', mowingHeight: 'high', gddThreshold: 275, rateOzPer1000SqFt: 0.34 },
    ],
  },
  {
    id: 'cutless-mec',
    name: 'Cutless MEC',
    activeIngredient: 'Flurprimidol',
    manufacturer: 'SePRO',
    description:
      'A long-lasting PGR that provides extended growth regulation. Particularly effective on warm-season grasses and in landscape bed applications for ornamental growth control.',
    grassProfiles: [
      { grassType: 'kentucky_bluegrass', mowingHeight: 'low', gddThreshold: 300, rateOzPer1000SqFt: 0.50 },
      { grassType: 'kentucky_bluegrass', mowingHeight: 'medium', gddThreshold: 350, rateOzPer1000SqFt: 0.50 },
      { grassType: 'kentucky_bluegrass', mowingHeight: 'high', gddThreshold: 400, rateOzPer1000SqFt: 0.67 },
      { grassType: 'perennial_ryegrass', mowingHeight: 'low', gddThreshold: 300, rateOzPer1000SqFt: 0.50 },
      { grassType: 'perennial_ryegrass', mowingHeight: 'medium', gddThreshold: 350, rateOzPer1000SqFt: 0.50 },
      { grassType: 'perennial_ryegrass', mowingHeight: 'high', gddThreshold: 400, rateOzPer1000SqFt: 0.67 },
      { grassType: 'tall_fescue', mowingHeight: 'medium', gddThreshold: 350, rateOzPer1000SqFt: 0.50 },
      { grassType: 'tall_fescue', mowingHeight: 'high', gddThreshold: 400, rateOzPer1000SqFt: 0.67 },
      { grassType: 'creeping_bentgrass', mowingHeight: 'low', gddThreshold: 250, rateOzPer1000SqFt: 0.33 },
      { grassType: 'creeping_bentgrass', mowingHeight: 'medium', gddThreshold: 300, rateOzPer1000SqFt: 0.50 },
      // Common Bermuda
      { grassType: 'bermudagrass', mowingHeight: 'low', gddThreshold: 350, rateOzPer1000SqFt: 0.67 },
      { grassType: 'bermudagrass', mowingHeight: 'medium', gddThreshold: 400, rateOzPer1000SqFt: 0.67 },
      { grassType: 'bermudagrass', mowingHeight: 'high', gddThreshold: 450, rateOzPer1000SqFt: 0.67 },
      // Tifway 419
      { grassType: 'bermuda_tifway419', mowingHeight: 'low', gddThreshold: 310, rateOzPer1000SqFt: 0.67 },
      { grassType: 'bermuda_tifway419', mowingHeight: 'medium', gddThreshold: 350, rateOzPer1000SqFt: 0.67 },
      { grassType: 'bermuda_tifway419', mowingHeight: 'high', gddThreshold: 400, rateOzPer1000SqFt: 0.67 },
      // TifTuf
      { grassType: 'bermuda_tiftuf', mowingHeight: 'low', gddThreshold: 310, rateOzPer1000SqFt: 0.67 },
      { grassType: 'bermuda_tiftuf', mowingHeight: 'medium', gddThreshold: 350, rateOzPer1000SqFt: 0.67 },
      { grassType: 'bermuda_tiftuf', mowingHeight: 'high', gddThreshold: 400, rateOzPer1000SqFt: 0.67 },
      // Celebration
      { grassType: 'bermuda_celebration', mowingHeight: 'low', gddThreshold: 310, rateOzPer1000SqFt: 0.67 },
      { grassType: 'bermuda_celebration', mowingHeight: 'medium', gddThreshold: 370, rateOzPer1000SqFt: 0.67 },
      { grassType: 'bermuda_celebration', mowingHeight: 'high', gddThreshold: 420, rateOzPer1000SqFt: 0.67 },
      // Tahoma 31
      { grassType: 'bermuda_tahoma31', mowingHeight: 'low', gddThreshold: 390, rateOzPer1000SqFt: 0.67 },
      { grassType: 'bermuda_tahoma31', mowingHeight: 'medium', gddThreshold: 440, rateOzPer1000SqFt: 0.67 },
      { grassType: 'bermuda_tahoma31', mowingHeight: 'high', gddThreshold: 500, rateOzPer1000SqFt: 0.67 },
      // Other warm-season
      { grassType: 'zoysiagrass', mowingHeight: 'low', gddThreshold: 350, rateOzPer1000SqFt: 0.50 },
      { grassType: 'zoysiagrass', mowingHeight: 'medium', gddThreshold: 400, rateOzPer1000SqFt: 0.67 },
      { grassType: 'zoysiagrass', mowingHeight: 'high', gddThreshold: 450, rateOzPer1000SqFt: 0.67 },
      { grassType: 'st_augustinegrass', mowingHeight: 'medium', gddThreshold: 400, rateOzPer1000SqFt: 0.67 },
      { grassType: 'st_augustinegrass', mowingHeight: 'high', gddThreshold: 450, rateOzPer1000SqFt: 0.67 },
    ],
  },
  {
    id: 'trimmit',
    name: 'Trimmit / Pac Man',
    activeIngredient: 'Paclobutrazol',
    manufacturer: 'Syngenta / Quali-Pro',
    description:
      'A soil-active PGR that is taken up through the roots. Provides long-lasting growth suppression and is commonly used in tank mixes with trinexapac-ethyl for enhanced regulation.',
    grassProfiles: [
      { grassType: 'kentucky_bluegrass', mowingHeight: 'low', gddThreshold: 350, rateOzPer1000SqFt: 0.38 },
      { grassType: 'kentucky_bluegrass', mowingHeight: 'medium', gddThreshold: 400, rateOzPer1000SqFt: 0.38 },
      { grassType: 'kentucky_bluegrass', mowingHeight: 'high', gddThreshold: 450, rateOzPer1000SqFt: 0.44 },
      { grassType: 'perennial_ryegrass', mowingHeight: 'low', gddThreshold: 350, rateOzPer1000SqFt: 0.38 },
      { grassType: 'perennial_ryegrass', mowingHeight: 'medium', gddThreshold: 400, rateOzPer1000SqFt: 0.38 },
      { grassType: 'perennial_ryegrass', mowingHeight: 'high', gddThreshold: 450, rateOzPer1000SqFt: 0.44 },
      { grassType: 'tall_fescue', mowingHeight: 'medium', gddThreshold: 400, rateOzPer1000SqFt: 0.38 },
      { grassType: 'tall_fescue', mowingHeight: 'high', gddThreshold: 450, rateOzPer1000SqFt: 0.44 },
      { grassType: 'creeping_bentgrass', mowingHeight: 'low', gddThreshold: 300, rateOzPer1000SqFt: 0.22 },
      { grassType: 'creeping_bentgrass', mowingHeight: 'medium', gddThreshold: 350, rateOzPer1000SqFt: 0.30 },
      // Common Bermuda
      { grassType: 'bermudagrass', mowingHeight: 'low', gddThreshold: 400, rateOzPer1000SqFt: 0.44 },
      { grassType: 'bermudagrass', mowingHeight: 'medium', gddThreshold: 450, rateOzPer1000SqFt: 0.44 },
      { grassType: 'bermudagrass', mowingHeight: 'high', gddThreshold: 500, rateOzPer1000SqFt: 0.44 },
      // Tifway 419
      { grassType: 'bermuda_tifway419', mowingHeight: 'low', gddThreshold: 350, rateOzPer1000SqFt: 0.44 },
      { grassType: 'bermuda_tifway419', mowingHeight: 'medium', gddThreshold: 400, rateOzPer1000SqFt: 0.44 },
      { grassType: 'bermuda_tifway419', mowingHeight: 'high', gddThreshold: 440, rateOzPer1000SqFt: 0.44 },
      // TifTuf
      { grassType: 'bermuda_tiftuf', mowingHeight: 'low', gddThreshold: 350, rateOzPer1000SqFt: 0.44 },
      { grassType: 'bermuda_tiftuf', mowingHeight: 'medium', gddThreshold: 400, rateOzPer1000SqFt: 0.44 },
      { grassType: 'bermuda_tiftuf', mowingHeight: 'high', gddThreshold: 440, rateOzPer1000SqFt: 0.44 },
      // Celebration
      { grassType: 'bermuda_celebration', mowingHeight: 'low', gddThreshold: 350, rateOzPer1000SqFt: 0.44 },
      { grassType: 'bermuda_celebration', mowingHeight: 'medium', gddThreshold: 420, rateOzPer1000SqFt: 0.44 },
      { grassType: 'bermuda_celebration', mowingHeight: 'high', gddThreshold: 470, rateOzPer1000SqFt: 0.44 },
      // Tahoma 31
      { grassType: 'bermuda_tahoma31', mowingHeight: 'low', gddThreshold: 440, rateOzPer1000SqFt: 0.44 },
      { grassType: 'bermuda_tahoma31', mowingHeight: 'medium', gddThreshold: 500, rateOzPer1000SqFt: 0.44 },
      { grassType: 'bermuda_tahoma31', mowingHeight: 'high', gddThreshold: 560, rateOzPer1000SqFt: 0.44 },
      // Other warm-season
      { grassType: 'zoysiagrass', mowingHeight: 'low', gddThreshold: 400, rateOzPer1000SqFt: 0.38 },
      { grassType: 'zoysiagrass', mowingHeight: 'medium', gddThreshold: 450, rateOzPer1000SqFt: 0.44 },
      { grassType: 'zoysiagrass', mowingHeight: 'high', gddThreshold: 500, rateOzPer1000SqFt: 0.44 },
    ],
  },
]
