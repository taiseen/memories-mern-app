import { IMG_UPLOAD, UPLOAD_START, UPLOAD_END, } from '../../constants/actionTypes';

export const img = (imgStore = { isSuccess: false }, { type, payload }) => {

    // console.log(imgStore);
    // console.log(payload.data.delete_url)

    switch (type) {
        case UPLOAD_START:
            return { ...imgStore, isSuccess: false };

        case UPLOAD_END:
            return { ...imgStore, isSuccess: true };

        case IMG_UPLOAD:
            const imgbb = {
                url: payload.data.url,
                deleteUrl: payload.data.delete_url,
            }
            return { ...imgStore, imgbb };

        // case IMG_DELETE:
        //     return { ...imgStore, '' };

        default:
            return imgStore;
    }
}