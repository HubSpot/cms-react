# Static Assets

Static asset in your modules with common extensions will resolve to public URLs automatically:

```javascript
import myImage from './myImage.png';

export default function MyComponent() {
  return <img src={myImage} />;
}
```

See [Vite’s static asset documentation](https://vitejs.dev/guide/assets.html) for more information.
