// utils/sectionSpacing.ts
export const getSectionSpacing = (screenWidth: number) => {
  if (screenWidth >= 2560) return '120px'     // 4xl
  if (screenWidth >= 1920) return '100px'     // 3xl
  if (screenWidth >= 1536) return '80px'      // 2xl
  if (screenWidth >= 1280) return '80px'      // xl (Desktop)
  if (screenWidth >= 1024) return '70px'      // lg
  if (screenWidth >= 800) return '60px'       // md (Nexus 7)
  if (screenWidth >= 768) return '65px'       // md (iPad mini)
  if (screenWidth >= 640) return '50px'       // sm (large mobile)
  if (screenWidth >= 568) return '40px'       // iPhone 5/5s
  return '35px'                               // xs (very small mobile)
}
