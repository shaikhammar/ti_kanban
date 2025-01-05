import { Column } from "@/types";
import { useProjectContext } from "./ProjectContext";
import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { useEffect, useState, useMemo } from "react";
import BoardColumn from "./BoardColumn";

export default function KanbanBoard() {
    const { selectedProject } = useProjectContext();
    // console.log(selectedProject?.columns);
    const [columns, setColumns] = useState<Column[]>([]);
    useEffect(() => {
        setColumns(selectedProject?.columns || []);
    }, [selectedProject?.columns]);

    const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

    console.log(columnsId);
    return (
        <div className="flex auto-rows-min gap-4 h-auto">
            <DndContext>
                <SortableContext items={columnsId}>
                    {columns?.map((column) => (
                        <BoardColumn column={column} />
                    ))}
                </SortableContext>
            </DndContext>
        </div>
    );
}
