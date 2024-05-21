import { Island } from '@hubspot/cms-components'
import AppIsland from '../../islands/App.jsx?island'

export const Component = () => {
  return <><h1>{`Hello`}</h1>
    <Island module={AppIsland} id="my-app" />
  </>
}

export const fields = []

export const meta = {
  label: `Routing Module`,
};
