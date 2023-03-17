import { NextPage } from "next";
import { AppProps } from "next/app";
import ButtonUp from "../components/ButtonUp";
import Head from "next/head";
import Navbar from "../components/navbar";
import "../styles/globals.css";
import Followers from "../Components/Followers/Followers";

const MyApp: NextPage = ({ Component, pageProps }: AppProps) => {
  return (
    <>
      <Head>
        <link rel="shortcut icon" href="/static/favicon.ico" />
        <title>Programadores Argentina - Comunidad</title>
      </Head>
      <Navbar />
      <Component {...pageProps} />
      <Followers />
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent sed
        neque vitae ipsum condimentum placerat. In non auctor mi, et congue
        ante. Donec mollis, nulla sit amet malesuada viverra, ipsum purus
        laoreet neque, quis euismod diam velit sed nulla. Donec vehicula orci a
        libero fermentum fringilla. Vestibulum in pharetra dui, in vehicula
        magna. Suspendisse non vulputate orci. Sed pretium sollicitudin dictum.
        Sed posuere, elit ultrices commodo gravida, ex augue sollicitudin nisl,
        et mollis odio quam bibendum nisi. Phasellus rutrum arcu sit amet metus
        hendrerit placerat. Mauris vel elit libero. Nullam iaculis iaculis
        lorem, a varius elit lobortis a. Vestibulum ac lectus quis massa
        facilisis finibus. In eget sollicitudin nibh, ac molestie libero. Ut in
        euismod sem. Phasellus aliquet, arcu vel egestas convallis, tortor erat
        pharetra sapien, eget malesuada metus purus eu risus. Mauris tortor
        nibh, porta sit amet elit vitae, accumsan pellentesque felis. Donec ac
        dui pretium, pretium velit at, semper metus. Proin fringilla, sem
        finibus fermentum cursus, elit massa ultricies metus, ut sodales justo
        ligula sed justo. Sed placerat ornare arcu sed hendrerit. Pellentesque
        est magna, bibendum at felis sed, malesuada consequat ante. Vestibulum
        blandit sodales nisi, quis maximus elit pharetra vel. Mauris consequat
        venenatis odio, quis pellentesque erat vulputate sit amet. Nullam
        gravida, arcu non ornare dignissim, libero justo ornare augue, vitae
        tristique turpis dui vel nulla. Fusce bibendum ut eros eget egestas.
        Vivamus ut sem rhoncus, lacinia quam ac, varius augue. Suspendisse
        potenti. Aliquam eget molestie turpis. Integer blandit mattis pulvinar.
        Suspendisse sagittis imperdiet lectus ac scelerisque. In a pellentesque
        diam. Etiam est est, egestas id tellus a, mattis convallis turpis. Sed
        in sagittis lorem, ut congue lectus. Phasellus sem sem, feugiat sed
        mattis vitae, viverra sed ipsum. Morbi feugiat urna quis magna
        fringilla, pulvinar posuere nisi viverra. Nulla vulputate venenatis
        felis eget faucibus. Curabitur pellentesque non mi non venenatis.
        Integer ultrices ornare augue, ut efficitur enim gravida eu. Donec sem
        mi, euismod in justo ut, iaculis gravida turpis. Praesent a tellus ac
        justo feugiat sollicitudin. Sed id dolor arcu. Duis congue sapien in mi
        lacinia, non venenatis ipsum bibendum. Nullam euismod risus pretium
        imperdiet pharetra. Nam viverra diam et nisi vulputate, vitae aliquam
        sapien feugiat. Suspendisse euismod, erat sit amet vehicula auctor,
        lorem ligula fermentum mauris, eget facilisis mauris metus quis nisi.
        Praesent quam nibh, volutpat nec tellus quis, scelerisque iaculis magna.
        Aenean non nisl justo. Pellentesque posuere est ac hendrerit
        ullamcorper. Mauris in faucibus sapien. Donec et dignissim purus, nec
        posuere tortor. Cras tempus ex eu velit ullamcorper varius in hendrerit
        arcu. Pellentesque lobortis pretium semper. Fusce maximus ligula luctus
        accumsan consectetur. Maecenas a aliquam turpis. Nulla finibus purus sed
        dui auctor, tincidunt porttitor nisi convallis. Morbi tincidunt
        vestibulum condimentum. Morbi egestas non magna eget posuere. Integer
        venenatis rhoncus diam finibus viverra. Integer lacus magna, tempus in
        erat a, rhoncus ullamcorper orci. In feugiat porta neque, vitae aliquam
        mi lacinia in. Cras sagittis dui eu dui ullamcorper, at bibendum justo
        interdum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
        id mattis mauris, ac dignissim. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Praesent sed neque vitae ipsum condimentum placerat. In
        non auctor mi, et congue ante. Donec mollis, nulla sit amet malesuada
        viverra, ipsum purus laoreet neque, quis euismod diam velit sed nulla.
        Donec vehicula orci a libero fermentum fringilla. Vestibulum in pharetra
        dui, in vehicula magna. Suspendisse non vulputate orci. Sed pretium
        sollicitudin dictum. Sed posuere, elit ultrices commodo gravida, ex
        augue sollicitudin nisl, et mollis odio quam bibendum nisi. Phasellus
        rutrum arcu sit amet metus hendrerit placerat. Mauris vel elit libero.
        Nullam iaculis iaculis lorem, a varius elit lobortis a. Vestibulum ac
        lectus quis massa facilisis finibus. In eget sollicitudin nibh, ac
        molestie libero. Ut in euismod sem. Phasellus aliquet, arcu vel egestas
        convallis, tortor erat pharetra sapien, eget malesuada metus purus eu
        risus. Mauris tortor nibh, porta sit amet elit vitae, accumsan
        pellentesque felis. Donec ac dui pretium, pretium velit at, semper
        metus. Proin fringilla, sem finibus fermentum cursus, elit massa
        ultricies metus, ut sodales justo ligula sed justo. Sed placerat ornare
        arcu sed hendrerit. Pellentesque est magna, bibendum at felis sed,
        malesuada consequat ante. Vestibulum blandit sodales nisi, quis maximus
        elit pharetra vel. Mauris consequat venenatis odio, quis pellentesque
        erat vulputate sit amet. Nullam gravida, arcu non ornare dignissim,
        libero justo ornare augue, vitae tristique turpis dui vel nulla. Fusce
        bibendum ut eros eget egestas. Vivamus ut sem rhoncus, lacinia quam ac,
        varius augue. Suspendisse potenti. Aliquam eget molestie turpis. Integer
        blandit mattis pulvinar. Suspendisse sagittis imperdiet lectus ac
        scelerisque. In a pellentesque diam. Etiam est est, egestas id tellus a,
        mattis convallis turpis. Sed in sagittis lorem, ut congue lectus.
        Phasellus sem sem, feugiat sed mattis vitae, viverra sed ipsum. Morbi
        feugiat urna quis magna fringilla, pulvinar posuere nisi viverra. Nulla
        vulputate venenatis felis eget faucibus. Curabitur pellentesque non mi
        non venenatis. Integer ultrices ornare augue, ut efficitur enim gravida
        eu. Donec sem mi, euismod in justo ut, iaculis gravida turpis. Praesent
        a tellus ac justo feugiat sollicitudin. Sed id dolor arcu. Duis congue
        sapien in mi lacinia, non venenatis ipsum bibendum. Nullam euismod risus
        pretium imperdiet pharetra. Nam viverra diam et nisi vulputate, vitae
        aliquam sapien feugiat. Suspendisse euismod, erat sit amet vehicula
        auctor, lorem ligula fermentum mauris, eget facilisis mauris metus quis
        nisi. Praesent quam nibh, volutpat nec tellus quis, scelerisque iaculis
        magna. Aenean non nisl justo. Pellentesque posuere est ac hendrerit
        ullamcorper. Mauris in faucibus sapien. Donec et dignissim purus, nec
        posuere tortor. Cras tempus ex eu velit ullamcorper varius in hendrerit
        arcu. Pellentesque lobortis pretium semper. Fusce maximus ligula luctus
        accumsan consectetur. Maecenas a aliquam turpis. Nulla finibus purus sed
        dui auctor, tincidunt porttitor nisi convallis. Morbi tincidunt
        vestibulum condimentum. Morbi egestas non magna eget posuere. Integer
        venenatis rhoncus diam finibus viverra. Integer lacus magna, tempus in
        erat a, rhoncus ullamcorper orci. In feugiat porta neque, vitae aliquam
        mi lacinia in. Cras sagittis dui eu dui ullamcorper, at bibendum justo
        interdum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
        id mattis mauris, ac dignissim. Lorem ipsum dolor sit amet, consectetur
        adipiscing elit. Praesent sed neque vitae ipsum condimentum placerat. In
        non auctor mi, et congue ante. Donec mollis, nulla sit amet malesuada
        viverra, ipsum purus laoreet neque, quis euismod diam velit sed nulla.
        Donec vehicula orci a libero fermentum fringilla. Vestibulum in pharetra
        dui, in vehicula magna. Suspendisse non vulputate orci. Sed pretium
        sollicitudin dictum. Sed posuere, elit ultrices commodo gravida, ex
        augue sollicitudin nisl, et mollis odio quam bibendum nisi. Phasellus
        rutrum arcu sit amet metus hendrerit placerat. Mauris vel elit libero.
        Nullam iaculis iaculis lorem, a varius elit lobortis a. Vestibulum ac
        lectus quis massa facilisis finibus. In eget sollicitudin nibh, ac
        molestie libero. Ut in euismod sem. Phasellus aliquet, arcu vel egestas
        convallis, tortor erat pharetra sapien, eget malesuada metus purus eu
        risus. Mauris tortor nibh, porta sit amet elit vitae, accumsan
        pellentesque felis. Donec ac dui pretium, pretium velit at, semper
        metus. Proin fringilla, sem finibus fermentum cursus, elit massa
        ultricies metus, ut sodales justo ligula sed justo. Sed placerat ornare
        arcu sed hendrerit. Pellentesque est magna, bibendum at felis sed,
        malesuada consequat ante. Vestibulum blandit sodales nisi, quis maximus
        elit pharetra vel. Mauris consequat venenatis odio, quis pellentesque
        erat vulputate sit amet. Nullam gravida, arcu non ornare dignissim,
        libero justo ornare augue, vitae tristique turpis dui vel nulla. Fusce
        bibendum ut eros eget egestas. Vivamus ut sem rhoncus, lacinia quam ac,
        varius augue. Suspendisse potenti. Aliquam eget molestie turpis. Integer
        blandit mattis pulvinar. Suspendisse sagittis imperdiet lectus ac
        scelerisque. In a pellentesque diam. Etiam est est, egestas id tellus a,
        mattis convallis turpis. Sed in sagittis lorem, ut congue lectus.
        Phasellus sem sem, feugiat sed mattis vitae, viverra sed ipsum. Morbi
        feugiat urna quis magna fringilla, pulvinar posuere nisi viverra. Nulla
        vulputate venenatis felis eget faucibus. Curabitur pellentesque non mi
        non venenatis. Integer ultrices ornare augue, ut efficitur enim gravida
        eu. Donec sem mi, euismod in justo ut, iaculis gravida turpis. Praesent
        a tellus ac justo feugiat sollicitudin. Sed id dolor arcu. Duis congue
        sapien in mi lacinia, non venenatis ipsum bibendum. Nullam euismod risus
        pretium imperdiet pharetra. Nam viverra diam et nisi vulputate, vitae
        aliquam sapien feugiat. Suspendisse euismod, erat sit amet vehicula
        auctor, lorem ligula fermentum mauris, eget facilisis mauris metus quis
        nisi. Praesent quam nibh, volutpat nec tellus quis, scelerisque iaculis
        magna. Aenean non nisl justo. Pellentesque posuere est ac hendrerit
        ullamcorper. Mauris in faucibus sapien. Donec et dignissim purus, nec
        posuere tortor. Cras tempus ex eu velit ullamcorper varius in hendrerit
        arcu. Pellentesque lobortis pretium semper. Fusce maximus ligula luctus
        accumsan consectetur. Maecenas a aliquam turpis. Nulla finibus purus sed
        dui auctor, tincidunt porttitor nisi convallis. Morbi tincidunt
        vestibulum condimentum. Morbi egestas non magna eget posuere. Integer
        venenatis rhoncus diam finibus viverra. Integer lacus magna, tempus in
        erat a, rhoncus ullamcorper orci. In feugiat porta neque, vitae aliquam
        mi lacinia in. Cras sagittis dui eu dui ullamcorper, at bibendum justo
        interdum. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
        id mattis mauris, ac dignissim.
      </p>
      <ButtonUp />
    </>
  );
};

export default MyApp;
