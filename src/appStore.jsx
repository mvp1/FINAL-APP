import {create} from "zustand"
import {persist} from "zustand/middleware";

let appStore = (set) => ({
    dopen: true,
    rows: [],
    updateOpen:(dopen) => set((state) => ({dopen:dopen})),
    setRows: (newRows) => set((state) => ({ rows: newRows })), // Add the setRows function

});

appStore = persist (appStore,{name:'my_app_store'});
export const useAppStore = create(appStore);