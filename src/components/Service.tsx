import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import DialogCustom from "./DialogCustom";
import { TableCustom } from "./TableCustom";
import { GenericRow, IService } from "@/interfaces";
import { useGenericCrud } from "@/hooks/useGenericCrud";
import { useGenericQuery } from "@/hooks/useGenericQuery";
import toast from "react-hot-toast";

const Service = () => {
    const { addItem, updateItem, deleteItem } = useGenericCrud("services");
    const { data: services = [], isLoading, isError } = useGenericQuery("services");
    // state for edit
    const [editService, setEditService] = useState<IService>({
        id: 0,
        name: "",
        price: 0,
        duration_minutes: 0,
    });
    const [isOpenEditDialog, setIsOpenEditDialog] = useState(false);
    // state for add

    const [addService, setAddService] = useState({
        name: "",
        price: 0,
        duration_minutes: 0,
    });
    const [isOpenAddDialog, setIsOpenAddDialog] = useState(false);
    // state for confirm or delete

    const [isOpenConfirmDialog, setIsOpenConfirmDialog] = useState(false);
    const [confirmService, setConfirmService] = useState<IService>({
        id: 0,
        name: "",
        price: 0,
        duration_minutes: 0,
    });
    // fun for add
    const onOpenAddDialog = () => setIsOpenAddDialog(true);
    const onCloseAddDialog = () => {
        setIsOpenAddDialog(false);
        setAddService({ name: "", price: 0, duration_minutes: 0 });
    };
    // fun for edit

    const onOpenEditDialog = (srv: IService) => {
        setIsOpenEditDialog(true);
        setEditService(srv);
    };
    const onCloseEditDialog = () => {
        setIsOpenEditDialog(false);
        setEditService({ id: 0, name: "", price: 0, duration_minutes: 0 });
    };
    // fun for confirm

    const onOpenConfirmDialog = (srv: IService) => {
        setIsOpenConfirmDialog(true);
        setConfirmService(srv);
    };
    const onCloseConfirmDialog = () => {
        setIsOpenConfirmDialog(false);
        setConfirmService({ id: 0, name: "", price: 0, duration_minutes: 0 });
    };

    const columns = [
        { label: "Service Name", accessor: "name" },
        { label: "Price", accessor: "price" },
        { label: "Duration (min)", accessor: "duration_minutes" },
        {
            label: "Actions",
            accessor: "actions",
            render: (_: any, row: GenericRow) => {
                const service = row as IService;
                return (
                    <div className="flex gap-2">
                        <Button size="sm" onClick={() => onOpenEditDialog(service)}>
                            Edit
                        </Button>
                        <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => onOpenConfirmDialog(service)}
                        >
                            Remove
                        </Button>
                    </div>
                );
            },
        },
    ];

    const onChangeAddHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = evt.target;
        setAddService({
            ...addService,
            [name]: name === "name" ? value : Number(value),
        });
    };

    const onSubmitAddHandler = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        try {
            await addItem.mutateAsync(addService);
            toast.success("Service added successfully ");
            onCloseAddDialog();
        } catch (error) {
            toast.error("Failed to add service ");
        }
    };

    const onChangeEditHandler = (evt: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = evt.target;
        setEditService((prev) => ({
            ...prev,
            [name]: name === "name" ? value : Number(value),
        }));
    };

    const onSubmitEditHandler = async (evt: React.FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        try {
            await updateItem.mutateAsync({ id: editService.id, data: editService });
            toast.success("Service updated successfully");
            onCloseEditDialog();
        } catch (error) {
            toast.error("Failed to update service");
        }
    };

    const onDeleteHandler = async () => {
        try {
            await deleteItem.mutateAsync(confirmService.id);
            toast.success("Service deleted ");
            onCloseConfirmDialog();
        } catch (error) {
            toast.error("Failed to delete service");
        }
    };

    if (isLoading) return <p>Loading services...</p>;
    if (isError) return <p>Error loading services.</p>;

    return (
        <div className="space-y-4 p-4">
            <Button onClick={onOpenAddDialog}>Add Service</Button>

            <TableCustom data={services} columns={columns} />
            {/* dialog for add */}
            <DialogCustom
                open={isOpenAddDialog}
                onOpenChange={setIsOpenAddDialog}
                title="Add Service"
                description="Fill in the details of the new service you'd like to add."
            >
                <form className="space-y-3" onSubmit={onSubmitAddHandler}>
                    <Input
                        name="name"
                        value={addService.name}
                        onChange={onChangeAddHandler}
                        placeholder="Service Name"
                        required
                    />
                    <Input
                        name="price"
                        type="number"
                        value={addService.price}
                        onChange={onChangeAddHandler}
                        placeholder="Price"
                    />
                    <Input
                        name="duration_minutes"
                        type="number"
                        value={addService.duration_minutes}
                        onChange={onChangeAddHandler}
                        placeholder="Duration (minutes)"
                    />
                    <div className="flex items-center space-x-3 mt-4">
                        <Button className="bg-indigo-700 hover:bg-indigo-800" type="submit">
                            Done
                        </Button>
                        <Button type="button" variant="destructive" onClick={onCloseAddDialog}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </DialogCustom>
            {/* dialog for edit */}

            <DialogCustom
                open={isOpenEditDialog}
                onOpenChange={setIsOpenEditDialog}
                title="Edit Service"
                description="Edit the details of the selected service."
            >
                <form className="space-y-3" onSubmit={onSubmitEditHandler}>
                    <Input
                        name="name"
                        value={editService.name}
                        onChange={onChangeEditHandler}
                        placeholder="Service Name"
                        required
                    />
                    <Input
                        name="price"
                        type="number"
                        value={editService.price}
                        onChange={onChangeEditHandler}
                        placeholder="Price"
                    />
                    <Input
                        name="duration_minutes"
                        type="number"
                        value={editService.duration_minutes}
                        onChange={onChangeEditHandler}
                        placeholder="Duration (minutes)"
                    />
                    <div className="flex items-center space-x-3 mt-4">
                        <Button className="bg-indigo-700 hover:bg-indigo-800" type="submit">
                            Done
                        </Button>
                        <Button type="button" variant="destructive" onClick={onCloseEditDialog}>
                            Cancel
                        </Button>
                    </div>
                </form>
            </DialogCustom>

            {/* dialog for delete */}

            <DialogCustom
                open={isOpenConfirmDialog}
                onOpenChange={setIsOpenConfirmDialog}
                title="Delete Service"
                description="Are you sure you want to delete this service? This action cannot be undone."
            >
                <div className="flex items-center space-x-3 mt-4">
                    <Button
                        className="bg-indigo-700 hover:bg-indigo-800"
                        type="button"
                        onClick={onDeleteHandler}
                    >
                        Delete
                    </Button>
                    <Button type="button" variant="destructive" onClick={onCloseConfirmDialog}>
                        Cancel
                    </Button>
                </div>
            </DialogCustom>
        </div>
    );
};

export default Service;
