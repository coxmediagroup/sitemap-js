/**
 * Helper function to prune unwanted properties from objects.
 *
 * @param srcObj A superset object which may contain more properties than is required
 * @param allowedProperties List of required property names to be cloned from the srcObj
 */
export const cherryPick = (srcObj: {}, allowedProperties: string[]): {} => {
  const newObj = {};
  allowedProperties.map((key) => {
    if (key in srcObj) {
      newObj[key] = srcObj[key];
    }
  });
  return newObj;
};
