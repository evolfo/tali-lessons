import React from "react";

class Blog extends React.Component {

    state = {
        blogs: []
    }

    componentDidMount() {
        // const content = import("../../posts/${slug}.md")
        // Have to do a basic for loop because babel-plugin-wildcard
        // is returning something that is not quite a normal object.
        // Can't call Blogs.values, can't do normal object stuff
        // for (let i = 1; i < 500; i++) {
        //     let blogNum = "Blog" + i;
            
        //     if (blog1[blogNum]) {
        //         this.setState(prevState => ({
        //             blogs: [...prevState.blogs, blog1[blogNum]],
        //         }));
        //     } else {
        //         break;
        //     }
        // }
    }

    render() {
        return (
            <div id="blog-wrapper">
                <h1>Coming Soon!</h1>
            </div>
        )
    }
}

export default Blog