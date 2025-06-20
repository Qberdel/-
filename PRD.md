# Product Requirements Document for СтройДом

## App Overview
- Name: СтройДом
- Tagline: Professional turnkey house construction services with transparent pricing and quality guarantees
- Category: cms_website
- Visual Style: Refined Technical (e.g. Stripe)


## Application Structure


### Route: /

Homepage featuring hero section with main value proposition, service overview cards (8 house types: brick, frame, gas concrete, timber, log, SIP panels, foam blocks, double timber), construction services grid (6 services: design, landscaping, septic installation, cadastral work, water supply, turnkey construction), photo gallery of completed projects, customer testimonials section, pricing table, company advantages section, and comprehensive footer with contact information. Includes prominent CTA buttons for price calculator and consultation booking.


### Route: /services

Detailed services page with comprehensive listings of all construction types, foundation options, design services, and additional construction work. Features expandable service categories, pricing information, and service-specific contact forms.


### Route: /contact

Contact page with company information, office address (Novosibirsk location), phone numbers, email, business hours, contact form for inquiries, and integrated map. Includes multiple contact methods including WhatsApp integration and callback request forms.






## Resources
- Original Construction Website (reference_site): https://novosibirsk.kamprok.ru/
- Company Logo (asset): https://novosibirsk.kamprok.ru/img/1015/logo.png
- Hero Background Image (asset): https://novosibirsk.kamprok.ru/img/1015/main-top.jpg
- Brick Houses Service Image (asset): https://novosibirsk.kamprok.ru/img/1015/s_doma-iz-kirpicha.jpg
- Frame Houses Service Image (asset): https://novosibirsk.kamprok.ru/img/1015/s_karkasnye-doma.jpg
- Gas Concrete Houses Image (asset): https://novosibirsk.kamprok.ru/img/1015/s_doma-iz-gazobetona.jpg
- Timber Houses Image (asset): https://novosibirsk.kamprok.ru/img/1015/s_profilirovannyj-brus.jpg
- Log Houses Image (asset): https://novosibirsk.kamprok.ru/img/1015/s_ocilindrovanoe-brevno.jpg
- SIP Panels Houses Image (asset): https://novosibirsk.kamprok.ru/img/1015/s_doma-iz-sip-panelej.jpg
- Foam Block Houses Image (asset): https://novosibirsk.kamprok.ru/img/1015/s_doma-iz-penobloka.jpg
- Double Timber Houses Image (asset): https://novosibirsk.kamprok.ru/img/1015/s_doma-iz-dvojnogo-brusa.jpg
- Design Services Image (asset): https://novosibirsk.kamprok.ru/img/1015/t_proektirovanie-domov.jpg
- Landscaping Services Image (asset): https://novosibirsk.kamprok.ru/img/1015/t_blagoustrojstvo.jpg
- Septic Installation Image (asset): https://novosibirsk.kamprok.ru/img/1015/t_ustanovka-septika.jpg
- Cadastral Work Image (asset): https://novosibirsk.kamprok.ru/img/1015/t_kadastrovye-raboty.jpg
- Water Supply Image (asset): https://novosibirsk.kamprok.ru/img/1015/t_vodosnabzhenie.jpg
- Turnkey Construction Image (asset): https://novosibirsk.kamprok.ru/img/1015/t_stroitelstvo-domov.jpg
- Project Gallery Image 1 (asset): https://novosibirsk.kamprok.ru/img/1015/gs_1.jpg
- Project Gallery Image 2 (asset): https://novosibirsk.kamprok.ru/img/1015/gs_2.jpg
- Project Gallery Image 3 (asset): https://novosibirsk.kamprok.ru/img/1015/gs_3.jpg
- Project Gallery Image 4 (asset): https://novosibirsk.kamprok.ru/img/1015/gs_4.jpg
- Customer Review Photo 1 (asset): https://novosibirsk.kamprok.ru/img//1015/f1745916071.jpg
- Customer Review Photo 2 (asset): https://novosibirsk.kamprok.ru/img//1015/f1745663711.jpg


## Additional Considerations



### Website/Landing Page-Specific Considerations
This app has been classified as a website/landing page, so please consider the following:
- Optimize the website, first and foremost, for mobile web. Ensure that the website is fully responsive.
- Utilize any provided resources (images, navigation URLs, etc.) from the ## Resources section exactly as they are, rather than creating placeholder content when available.
- Consider that website content such as images, tables, and static text can be directly embedded in the frontend components
- If the website would benefit from placeholder content AND no specific content sources (e.g. a source URL) has already been provided by the user, create an idempotent seed script that populates content-related tables (e.g. blog posts). You can make use of the requestMultimodalModel function from ~/server/actions to generate relevant, visually appealing placeholder images. Make sure the frontend is updated to fetch this data from the database rather than hardcoding it. Do NOT create a seed script if the user has provided specific content to use, such as in website clone requests or when resources are provided.
- Write an admin setup endpoint in `api.ts`: This endpoint (e.g. `_makeUserAdmin`) should upsert the current authenticated user (`getUserId`) as an admin.
- Use the runRpcEndpoint tool to invoke the `_makeUserAdmin` RPC method to update the user's admin status. This must be called with `onBehalfOfCurrentUser: true`.
- Create an admin dashboard that makes sense given the project's purpose. For example, a personal or company website might have a dashboard for managing blog posts, images and other cotent. It might also include basic analytics and settings.
- Verify Secure Dashboard Access: Confirm that the dashboard is only visible to users with admin status (e.g., an endpoint `ensureAdminAccess` that uses `getUserId` with `throwIfNotLoggedIn: true`).
- Confirm that there's a way to navigate to the admin dashboard from the main app. The navigation UI should be conditionally rendered based on the user's admin status (e.g. via an endpoint named `getAdminStatus`). It is very important that this endpoint uses `getUserId` with `throwIfNotLoggedIn: false` to ensure that non-authenticated users will not be prompted to login in order to view the website. Failing to do so will break the experience for many websites.