# Prerendering

JS modules and JS partials will be prerendered by default as part of the overall CMS page logic to prerender providing a faster load time for static content. JS partials that are passed [prerender-incompatible HubL values](https://developers.hubspot.com/docs/cms/developer-reference/cdn/prerendering#incompatible-hubl-variables) will not be prerendered, since the HubL referencing it will disqualify it from prerendering. See the [prerendering documentation](https://developers.hubspot.com/docs/cms/developer-reference/cdn/prerendering) for more information.
