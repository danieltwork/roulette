/**
 * Default dropRoulette handler
 *
 * @param req
 * @param res
 */
export const dropRoulette = (req, res) => res.json({
  drop: Math.round(Math.random() * 36)
})

/**
 * dropRoulette handlers
 *
 * @typedef {Object} dropRoulette
 * @property {function} dropRoulette
 */
export default {
  dropRoulette,
}