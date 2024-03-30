import { fabric } from "fabric";
export const addGridOnCanvas = (gridColumns = 4) => {
  const { canvas } = window;
  if (!canvas) return;
  const width = canvas.width;
  const height = canvas.height;
  const gridColor = "#1B44C8";
  // Remove existing grid lines (if any)
  removeGridsFromCanvas();
  // Calculate the width of each column
  const columnWidth = width / gridColumns;

  // Draw vertical grid lines
  for (let i = 1; i < gridColumns; i++) {
    const x = i * columnWidth;
    const line = new fabric.Line([x, 0, x, height], {
      stroke: gridColor,
      selectable: false,
      evented: false,
      strokeWidth: 1,
      opacity: 0.1,
      type: "gridLine",
    });
    canvas.add(line);
  }

  // Draw horizontal grid lines
  for (let i = 1; i < gridColumns; i++) {
    const y = i * (height / gridColumns);
    const line = new fabric.Line([0, y, width, y], {
      stroke: gridColor,
      selectable: false,
      evented: false,
      strokeWidth: 1,
      opacity: 0.1,
      type: "gridLine",
    });
    canvas.add(line);
  }
  canvas.set({
    gridActive: true,
    gridColumns: gridColumns,
  });
  canvas.discardActiveObject();
  canvas.renderAll();
};

export const removeGridsFromCanvas = () => {
  const { canvas } = window;
  if (!canvas) return;
  const gridLines = canvas._objects.filter((x) => x.type === "gridLine");
  gridLines.forEach((line) => canvas.remove(line));
  canvas.set({
    gridActive: false,
  });
  canvas.renderAll();
};
