import { convertToBlobUrl } from "utils";
import NewPagePicture from "assets/img/new-page.png";
import { defaultCanvasJson, setCanvasInContrainer } from "canvas-actions";
import { cloneDeep } from "lodash";
export const renderCurrentPage = () => {
    const { canvas } = window;
    if (!canvas) return;
    const imageUrl = convertToBlobUrl(canvas.toDataURL("image/jpeg", 1.0));
    const index = canvas.pages.findIndex(x => x.id === canvas.activePage);
    if (index!=-1) {
        canvas.pages[index].image = imageUrl;
    }
}

export const addPageToCanvas = () => {
    const { canvas } = window;
    if (!canvas) return;
    const { pages, activePage } = canvas;
    // Discarding Active Object
    canvas.discardActiveObject();

    // Saving Previous Page Data
    const currentPages = cloneDeep(pages);
    const index = pages.findIndex(x => x.id === activePage);
    if (index != -1) {
        currentPages[index].json = JSON.stringify(canvas.toPageJSON());
    }

    // Adding New Page
    const newPageId = pages.length;
    const newPage = {
        title: `Page # ${pages.length + 1}`,
        json: defaultCanvasJson,
        id: newPageId,
        image: NewPagePicture
    };
    canvas.activePage = newPageId;
    const parsedJson = JSON.parse(defaultCanvasJson);
    canvas.loadFromJSON(parsedJson, () => {
        currentPages.push(newPage);
        const { originalWidth, originalHeight } = parsedJson;
        setCanvasInContrainer(originalWidth, originalHeight);
        canvas.pages = cloneDeep(currentPages);
        canvas.fire("switchActivePage");
        canvas.renderAll();
    })
}

export const switchPage = (pageId) => {
    const { canvas } = window;
    if (!canvas) return;
    const { pages, activePage } = canvas;
    const currentPageIndex = pages.findIndex(x => x.id === activePage); // Current Page Index
    const movePageIndex = pages.findIndex(x => x.id === pageId); // Move Page Index
    // Checking Found Index Found
    if (currentPageIndex != -1 && movePageIndex != -1) {
        // Discarding Active Object
        canvas.discardActiveObject();
        // Saving Previous Page Data
        const clonedPages = cloneDeep(pages);
        clonedPages[currentPageIndex].json = JSON.stringify(canvas.toPageJSON());
        canvas.activePage = pageId;
        const parsedJson = JSON.parse(clonedPages[movePageIndex].json);
        canvas.loadFromJSON(parsedJson, () => {
            const { originalWidth, originalHeight } = parsedJson;
            setCanvasInContrainer(originalWidth, originalHeight);
            canvas.pages = cloneDeep(clonedPages);
            canvas.renderAll();
            canvas.fire("switchActivePage");
        })
    }
}

export const duplicatePage = (pageId) => {
    const { canvas } = window;
    if (!canvas) return;
    const { pages } = canvas;
    const duplicatePageIndex = pages.findIndex(x => x.id === pageId); // Move Page Index
    if (duplicatePageIndex > -1) {
        const newPageId = pages.length;
        const duplicatePage = cloneDeep(pages[duplicatePageIndex]);
        duplicatePage.title = duplicatePage.title + " " + "(Duplicate)";
        duplicatePage.id = newPageId;
        pages.splice(duplicatePageIndex + 1, 0, cloneDeep(duplicatePage));
        canvas.activePage = newPageId;
        canvas.loadFromJSON(JSON.parse(duplicatePage.json), () => {
            canvas.pages = cloneDeep(pages);
            canvas.renderAll();
            canvas.fire("switchActivePage");
        })
    }

}

export const removePage = (pageId) => {
    const { canvas } = window;
    if (!canvas) return;
    const { pages, activePage } = canvas;
    const removePageIndex = pages.findIndex(x => x.id === pageId); // Move Page Index
    const activePageIndex = pages.findIndex(x => x.id === activePage); // Move Page Index
    if (pages.length > 1 && removePageIndex >= 0) {
        const newPageId = removePageIndex === activePageIndex ? pages[removePageIndex - 1].id : activePage;
        pages.splice(removePageIndex, 1);
        if (removePageIndex === activePageIndex) {
            canvas.loadFromJSON(JSON.parse(pages[removePageIndex - 1].json), () => {
                canvas.pages = cloneDeep(pages);
                canvas.activePage = newPageId;
                canvas.renderAll();
                canvas.fire("switchActivePage");
            })
        } else {
            canvas.pages = cloneDeep(pages);
            canvas.activePage = newPageId;
            canvas.renderAll();
            canvas.fire("switchActivePage");
        }

    }
}

export const downloadSpecificPage = (pageTitle) => {
    const { canvas } = window;
    if (!canvas) return;
    canvas.fire("downloadCanvas", { pageTitle });
}