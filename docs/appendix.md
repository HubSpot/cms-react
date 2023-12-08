# Appendix

## Deployment

JS Rendering uses the [Projects](https://developers.hubspot.com/docs/platform/build-and-deploy-using-hubspot-projects) system to manage your JS components. The Projects system is also used to build [private apps](https://developers.hubspot.com/docs/platform/create-private-apps-with-projects), [CRM extensions](https://developers.hubspot.com/docs/platform/create-custom-cards-with-projects), and [serverless functions](https://developers.hubspot.com/docs/platform/serverless-functions). By creating the proper directory structure like in the [js-rendering-hello-world](https://git.hubteam.com/HubSpot/js-rendering-hello-world/tree/master/hello-world-project) repo you can use the `hs project upload` command to upload your code to HubSpot where we will then build it and deploy it, making your components available for reference in HubL templates via the `module` and `js_partial` tags.

After running `hs project upload` you’ll be able to see its build/deploy status in the [Projects UI](https://app.hubspot.com/l/developer-projects/).

HubL assets, such as HubL templates that reference JS partials or modules, aren’t managed with Projects but you can upload them as a theme with the `hs upload` command, making them available in the Design Manager.

Just like in the [js-rendering-hello-world repo](https://git.hubteam.com/HubSpot/js-rendering-hello-world/tree/master/hello-world-project), we recommend separating your JS rendering components and HubL assets into different directories.

## Server-side/Client-side Rendering

One concept that can be difficult to understand is the relation between server-side rendering, client-side rendering, and hydration

This page gives a good overview of these terms: https://web.dev/rendering-on-the-web

Once familiar with these terms, let's look at an example component and how it can be rendered server-side only, client-side only, and server-side with client-side hydration.

```javascript
function HelloWorldComponent() {
  const afterHydration = useAfterIslandHydration();
  if (afterHydration) {
    return <div>Hello, hydration!</div>;
  }
  return <div>Hello, world!</div>;
}
```

In the left-most column, a server-side only render, notice that we don’t wrap our component with the Island component. Since there is no Island the client will display the server-side rendered “Hello, world!”. This HTML will never be modified on the client as it is not an Island.

In the middle column, a client-side-only render, we wrap the component in an Island, but set the `clientOnly` flag to `true`. This means the server will skip rendering the component on the server and will only return an empty `div` for React to attach to. On the client, the Island’s React code will be downloaded and [instantiated](https://react.dev/reference/react-dom/client/createRoot#root-render) for the component. The client will display “Hello, hydration!” immediately, as `useAfterIslandHydration` always resolves to `true` when `clientOnly` is set to `true` (since there is no hydration).

In the right-most column, a server-side render with client hydration, we wrap the component in an Island without the `clientOnly` option set. Immediately the client will display the server-side rendered “Hello, world!”, and then the Island’s React code will be downloaded and [instantiated](https://react.dev/reference/react-dom/client/hydrateRoot) (“hydrated”), with the first render also returning “Hello, world!”, since `useAfterIslandHydration` will return `false` on its first invocation. Automatically, there is a subsequent render where `useAfterIslandHydration` will resolve to `true` and the client will show “Hello, hydration!”.

### Mismatch Error Example

This example leads to an error because the result of client hydration does not match the server render. When there’s a mismatch this can cause problems with React.This is why `useAfterIslandHydration` is helpful. More information on this error can be found in the [React docs](https://react.dev/reference/react-dom/client/hydrateRoot#handling-different-client-and-server-content).

```javascript
function HelloWorldComponent() {
  // resolves to true in browser
  if (typeof window !== 'undefined') {
    return <div>Hello, client!</div>;
  }
  return <div>Hello, server!</div>;
}
```

The difference in this example is in the right column, the server-side render with client hydration. When the Island’s React code gets downloaded and instantiated, the first render will result in HTML that’s different from what we received from the server (since the `if` statement will always resolve to `true` on the client). These renders must match. This is fixed by using `useAfterIslandHydration` like in the previous example.

Recipes (todo: add diagrams)

## Learning links

### Learning JavaScript:

- [Modern JavaScript tutorial \(javascript.info\)](https://javascript.info/)
- [Just JavaScript course \(for purchase\)](https://justjavascript.com/)

### Learning React:

- [React Quick start tutorial \(official docs\)](https://react.dev/learn)
- [React API reference \(official docs\)](https://react.dev/reference/react)
- [The Perils of Rehydration](https://www.joshwcomeau.com/react/the-perils-of-rehydration/)

Other media and recordings:

- [￼HubSpot.Extend\(\) “How JavaScript Rendering Powers Business-enabled Sites” talk recording](https://www.youtube.com/watch?v=chj-_yBN5_c)

## Concepts/Glossary

### Partials, Modules

A JS Partial is a React component that can be loaded directly into a template, using the HubL tag render_js_partial. It must be located in the `components/partials/` subdirectory of the JavaScript project component. A JS Module behaves just like a traditional HubL module, but defined with JavaScript and a React component. It must be located in the `components/modules/` subdirectory of the JavaScript project component.

### CSR and SSR

Client Side Rendering (CSR) and Server Side Rendering (SSR) are two different ways of rendering web pages to serve to the end user. At a high level, SSR is when the HTML for a page is generated on the server and then sent to the client. CSR on the other hand sends a bundle of JavaScript to the user, which is then run on the browser to generate the HTML for the page. Some web performance metrics relevant to tradeoffs between client and server renders are:

- [Time to First Byte \(TTFB\)](https://web.dev/ttfb/)
- [First Contentful Paint \(FCP\)](https://web.dev/first-contentful-paint/)
- [Time To Interactive \(TTI\)](https://web.dev/interactive/)
- [Total Blocking Time \(TBT\)](https://web.dev/tbt/)
- [Cumulative Layout Shift \(CLS\)](https://web.dev/cls/)

A server side render of a web page generates the full HTML on the server when the user makes a request, and sends it to the user. By running any logic for the page on the server instead of the user's machine, you can avoid sending JavaScript to the client, allowing for a TTI equal to your FCP and minimal TBT. Since you are sending all of the HTML the user needs to see your website at once, the FCP of your page is very fast relative to TTFB. Since the initial page render is complete, any CLS is avoided. The main downside to full server rendering is a higher TTFB, since generating a full page on the server can take time depending on the complexity of the page. Additionally, if your page has interactivity, it usually requires some amount of JavaScript sent to the browser that can be time-consuming to manage alongside your server-rendered page, especially if server render is in a non-JavaScript runtime (such as HubL).

Server-rendered pages that do not have much dynamic content, such as blogs, or knowledge base articles, can take advantage of a static render. A statically-rendered page is one that is prerendered ahead of time and stored on the server (or a [CDN](https://web.dev/content-delivery-networks/)) to be immediately served to the user when a request is made. This is distinct from SSR since the same HTML is reused on every request. [Eligible HubSpot pages make use of static rendering by default](https://developers.hubspot.com/docs/cms/developer-reference/cdn/prerendering?__hstc=75491725.e2098b212e147a7b9be6fd756c0c6815.1649440584659.1667397195793.1667489478959.105&__hssc=75491725.4.1667489478959&__hsfp=1149209764). This technique improves server-rendered TTFB, and indirectly all other metrics, at the cost of your page being less dynamic.

A client side render of a web page is done by sending a small, visually empty HTML file and a bundle of JavaScript that will run to render the full page content on the user’s browser. This can require sending quite a large amount of JavaScript to the user, and can be slowed down by how fast the user’s hardware can process the JavaScript. But for pages or applications that are very dynamic or interactive, this can be a good approach that avoids a lot of infrastructure overhead. For client side renders, TTFB will be very low, since no rendering logic happens before the first byte, but FCP, TTI, and TBT will be much higher. Client side pages also experience layout shift since the initial render is an empty page that gets filled out later.

### Islands

As a HubSpot developer, quite a few of the pages you will be developing will be static. Content such as blog posts, knowledge base articles, landing pages, are primarily static HTML. But often you will need to have some sort of interactivity on your page, such as image carousels, a form with client validation, or a live-chat widget.

In the traditional HubL world, adding interactivity to your page often requires rendering the entire interactive chunk of your page client side using JavaScript. This can impact page performance negatively, since it requires the user to download, parse, and execute a large amount of JavaScript to render. This method can also impact the SEO of your page since the initial HTML response is often empty of any content.

[Islands](https://www.patterns.dev/posts/islands-architecture/) address this issue by aiming for the best of both worlds between CSR and SSR. An island is a subtree of your partial or module that contains interactivity, such as buttons or a search field. When serving a page to the user, your page is fully server rendered, and that HTML is initially rendered to the user without interactivity. Then, when needed, the interactive JavaScript in the island is automatically [hydrated](https://reactjs.org/docs/react-dom-client.html#hydrateroot), which is the process of loading, running, and attaching the client-side React component to the server-rendered HTML.

Loading the interactive parts of your page using islands can improve page performance compared to a fully client-side approach. Since most of your page is rendered to HTML on the server, the only JavaScript a user’s browser needs to download is what is required to hydrate your islands. While more work is done to create the initial server-side HTML relative to a client-side page’s initial empty HTML response, the time from first paint to interactive is reduced. This usually results in a sharp decrease in FCP and a decrease in TTI. Since Island content renders on the server initially, it eliminates layout shift in most scenarios. Islands also help with SEO for interactive pages, since the initial HTML response contains all content.

Another benefit of islands is the flexibility to choose when they are hydrated, known as [progressive hydration](https://www.patterns.dev/posts/progressive-hydration/). Rather than doing all the hydration on page load, which might be expensive for complex pages, you can defer hydration of non-critical pieces of your page to when the browser has finished all other work, or when the user scrolls down to an island initially below the page fold. For complex islands, this can be a significant performance benefit: if the user never scrolls to see it, it will never be loaded.
