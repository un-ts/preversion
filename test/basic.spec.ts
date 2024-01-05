import { getPreversion, getPreversionTag } from 'preversion'

test('getPreversionTag', () => {
  expect(getPreversionTag('')).toBeUndefined()
  expect(getPreversionTag('unknown')).toBeUndefined()
  expect(getPreversionTag('alpha')).toBe('alpha')
  expect(getPreversionTag('-alpha')).toBe('alpha')
  expect(getPreversionTag('-alpha.0')).toBe('alpha')
  expect(getPreversionTag('beta')).toBe('beta')
  expect(getPreversionTag('-beta')).toBe('beta')
  expect(getPreversionTag('-beta.1')).toBe('beta')
})

test('getPreversion', () => {
  expect(getPreversion('alpha', 'v0.1.0')).toBe('0.1.0')
  expect(getPreversion('alpha', '0.1.0')).toBe('0.1.0')
})
