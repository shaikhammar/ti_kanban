import { Column } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export type ColumnType = "Column";

export interface ColumnDragData {
    type: ColumnType;
    column: Column;
}

export default function BoardColumn({ column }: { column: Column }) {
    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
    } = useSortable({
        id: column.id,
        // data: {
        //     type: "Column",
        //     column,
        // } satisfies ColumnDragData,
        // attributes: {
        //     roleDescription: `Column: ${column.title}`,
        // },
    });

    const style = {
        transition,
        transform: CSS.Translate.toString(transform),
    };

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="aspect-video rounded-xl bg-muted/50 flex flex-col items-center justify-between p-4"
            key={column.id}
        >
            {/* <div className="flex items-center justify-between p-4"></div> */}
            <h3 className="text-lg font-semibold">{column.title}</h3>
            <span className="text-muted-foreground">
                {column.tasks.length} tasks
            </span>
        </div>
    );
}
