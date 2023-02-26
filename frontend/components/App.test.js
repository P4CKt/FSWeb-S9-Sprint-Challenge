import React from 'react'
import AppFunctional from './AppFunctional'
import { render, fireEvent, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'


const updateStatelessSelectors = document => {
  up = document.querySelector('#up')
  down = document.querySelector('#down')
  left = document.querySelector('#left')
  right = document.querySelector('#right')
  reset = document.querySelector('#reset')
  submit = document.querySelector('#submit')
}
test('sanity', () => {
  expect(true).toBe(true)
})

test("App Çalışıyor",()=>{
  render(<AppFunctional/>)
});
describe("Buton metin testleri",()=>{
test("Butonlar Görünüyor",()=>{
  render(<AppFunctional/>)
  expect(screen.up).toBe();
  expect(screen.down).toBe();
  expect(screen.left).toBe();
  expect(screen.right).toBe();
  expect(screen.submit).toBe();
  expect(screen.reset).toBe();
});
test("Koordinatlar Görünüyor", () => {
  render(<AppFunctional />);
  const coordinatesText = screen.getByText(/Koordinatlar/i);
  expect(coordinatesText).toBeInTheDocument();
});

test("Stepler Görünüyor", () => {
  render(<AppFunctional />);
  const countStep = screen.getByText(/kere ilerlediniz/i);
  expect(countStep).toBeInTheDocument();
});
})