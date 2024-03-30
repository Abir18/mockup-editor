import DemoImage from "assets/img/demo.jpg";
import { InifiniteEndMessage } from "components/helpers";
const TutorialsContent = () => {
    return (
        <>
            <div className="library-inner-container library-height overfloy-y-container library-footer">
                {
                    tutorials && tutorials.map((item) => (
                        <div className="tutorial-card" key={`Tutorials Card ${item.title}`}>
                            <img src={DemoImage} />
                            <p>{item.title}</p>
                        </div>
                    ))
                }
                <InifiniteEndMessage />
            </div>
        </>
    )
}

// src={`https://admin-storage.glorify.com/${item.thumbnail}`}

export default TutorialsContent;

const tutorials = [
    {
        "id": 24,
        "category_id": 3,
        "title": "1. Select the perfect template",
        "keywords": "templates",
        "video_code": "https://www.youtube.com/embed/RZ_A0SCDfFw",
        "thumbnail": "uploads/images/1645720726hqdefault.jpg",
        "help_display": "yes",
        "sort_order": 1,
        "help_sort_order": 0,
        "duration": "",
        "short_description": null
    },
    {
        "id": 33,
        "category_id": 3,
        "title": "5. wqeeeee qweeee qweeeeee",
        "keywords": "new",
        "video_code": "https://www.youtube.com/embed/kZia73g-dpI",
        "thumbnail": "uploads/images/1645786823AA_(9).png",
        "help_display": "yes",
        "sort_order": 1,
        "help_sort_order": 1,
        "duration": "",
        "short_description": null
    },
    {
        "id": 25,
        "category_id": 3,
        "title": "2. Creating a Product Image",
        "keywords": "product,images,,editor",
        "video_code": "https://www.youtube.com/embed/6uPSQPo3JV8",
        "thumbnail": "https://app.glorifyapp.com/admin/uploads/images/YT_Tumbnail_-_1280_x_723.jpg",
        "help_display": "yes",
        "sort_order": 2,
        "help_sort_order": 0,
        "duration": "",
        "short_description": null
    },
    {
        "id": 26,
        "category_id": 3,
        "title": "3. Lifestyle & Callout Images",
        "keywords": "lifestyle,,annotations,,callouts",
        "video_code": "https://www.youtube.com/embed/FyV_GDZDoKo",
        "thumbnail": "https://app.glorifyapp.com/admin/uploads/images/YT_Tumbnail_-_1280_x_724.jpg",
        "help_display": "yes",
        "sort_order": 3,
        "help_sort_order": 0,
        "duration": "",
        "short_description": null
    },
    {
        "id": 27,
        "category_id": 3,
        "title": "4. Resizing & Saving",
        "keywords": "resize,,save",
        "video_code": "https://www.youtube.com/embed/Dd80YPDXifI",
        "thumbnail": "https://app.glorifyapp.com/admin/uploads/images/YT_Tumbnail_-_1280_x_725.jpg",
        "help_display": "yes",
        "sort_order": 4,
        "help_sort_order": 0,
        "duration": "",
        "short_description": null
    }
]