import React from "react";
import { Link } from "react-router-dom";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import Menu from "../components/Menu";

const Single = () => {
  return (
    <div className="single">
      <div className="content">
        <img src="" alt="" />
        <div className="user">
          <img src="" alt="" />
          <div className="info">
            <span>John</span>
            <p>Posted 2 days ago</p>
          </div>
          <div className="edit">
            <Link to={`/write?edit=2`}>
              <img src={Edit} alt="" />
            </Link>
            <img src={Delete} alt="" />
          </div>
        </div>
        <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Euismod nisi porta lorem mollis aliquam ut porttitor leo. Non diam phasellus vestibulum lorem. Mus mauris vitae ultricies leo integer. In aliquam sem fringilla ut. Tellus pellentesque eu tincidunt tortor aliquam nulla facilisi cras fermentum. Mauris nunc congue nisi vitae suscipit tellus. Viverra tellus in hac habitasse platea dictumst vestibulum rhoncus. Morbi blandit cursus risus at ultrices mi tempus imperdiet nulla. Enim lobortis scelerisque fermentum dui faucibus in ornare. Molestie nunc non blandit massa. Ac ut consequat semper viverra. Senectus et netus et malesuada fames ac turpis egestas maecenas. Venenatis urna cursus eget nunc scelerisque viverra mauris in aliquam. Volutpat est velit egestas dui id ornare arcu odio ut. Aliquet sagittis id consectetur purus ut faucibus pulvinar. Faucibus a pellentesque sit amet porttitor eget dolor morbi non. Arcu non odio euismod lacinia at quis risus.

Gravida in fermentum et sollicitudin ac orci phasellus. Egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam. Aliquet sagittis id consectetur purus ut faucibus. Non sodales neque sodales ut. Non sodales neque sodales ut etiam sit amet nisl purus. Tellus molestie nunc non blandit massa enim nec. At auctor urna nunc id cursus metus aliquam eleifend mi. Sit amet justo donec enim diam vulputate ut. Posuere sollicitudin aliquam ultrices sagittis. Id venenatis a condimentum vitae. Etiam tempor orci eu lobortis elementum nibh tellus. Vel pretium lectus quam id leo in. Neque volutpat ac tincidunt vitae semper. Amet porttitor eget dolor morbi non. Non odio euismod lacinia at quis risus sed vulputate. Risus ultricies tristique nulla aliquet enim tortor at auctor. Cursus eget nunc scelerisque viverra mauris. Aliquet enim tortor at auctor.

Adipiscing bibendum est ultricies integer quis auctor elit sed. Hendrerit dolor magna eget est lorem. Lorem ipsum dolor sit amet consectetur adipiscing elit. Nullam ac tortor vitae purus faucibus ornare suspendisse. Sed risus pretium quam vulputate dignissim suspendisse. Scelerisque eleifend donec pretium vulputate sapien nec sagittis aliquam malesuada. Augue interdum velit euismod in pellentesque massa placerat. Mattis rhoncus urna neque viverra justo nec ultrices dui. Lacinia quis vel eros donec ac odio tempor orci dapibus. Gravida neque convallis a cras semper auctor neque vitae tempus. Varius sit amet mattis vulputate enim nulla. Est lorem ipsum dolor sit amet consectetur. Hendrerit dolor magna eget est. Risus nec feugiat in fermentum posuere urna.

Sociis natoque penatibus et magnis. Platea dictumst quisque sagittis purus sit amet volutpat consequat mauris. Adipiscing at in tellus integer feugiat scelerisque varius morbi. Arcu odio ut sem nulla. Nisl purus in mollis nunc sed. In fermentum posuere urna nec tincidunt praesent semper feugiat. Integer enim neque volutpat ac tincidunt vitae. Tristique magna sit amet purus gravida. Massa id neque aliquam vestibulum. Suspendisse ultrices gravida dictum fusce ut placerat orci. Cras sed felis eget velit aliquet. Non curabitur gravida arcu ac tortor dignissim convallis. Venenatis urna cursus eget nunc.

Facilisis volutpat est velit egestas dui id. Massa eget egestas purus viverra accumsan in. Auctor urna nunc id cursus metus aliquam eleifend mi. A iaculis at erat pellentesque adipiscing commodo elit. Tellus id interdum velit laoreet id. Faucibus nisl tincidunt eget nullam. Blandit volutpat maecenas volutpat blandit. Feugiat vivamus at augue eget arcu dictum. Vitae congue mauris rhoncus aenean vel elit scelerisque mauris pellentesque. Viverra tellus in hac habitasse platea. Id venenatis a condimentum vitae sapien pellentesque. Pellentesque adipiscing commodo elit at imperdiet dui accumsan.</p>
      </div>
      <Menu/>
    </div>
  );
};

export default Single;
