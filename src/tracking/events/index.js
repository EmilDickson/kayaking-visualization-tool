export const pageViewEvent = (pageId, userId) => ({
    type: "PAGE_VIEW",
    data: { pageId, userId }
});

