export function sortObjectsByKey(
   element1: Record<string, any>,
   element2: Record<string, any>,
   key: string,
   desc = false,
) {
   if (desc) {
      if (element1[key] > element2[key]) {
         return -1;
      }
      if (element1[key] < element2[key]) {
         return 1;
      }
   } else {
      if (element1[key] > element2[key]) {
         return 1;
      }
      if (element1[key] < element2[key]) {
         return -1;
      }
   }
   return 0;
}
