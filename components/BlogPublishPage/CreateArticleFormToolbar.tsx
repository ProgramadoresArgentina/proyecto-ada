export default function CreateArticleFormToolbar() {
    return (
      <div id='toolbar' className='shadow-sm sticky top-0 bg-[#f8fafc] z-20'>
        <span className='ql-formats'>
          <button className='ql-bold'></button>
          <button className='ql-italic'></button>
          <button className='ql-strike'></button>
          <button className='ql-code'></button>
          <button className='ql-link'></button>
        </span>
        <span className='ql-formats'>
          <button type='button' className='ql-image'></button>
          <button type='button' className='ql-video'></button>
          <button type='button' className='ql-code-block'></button>
        </span>
        <span className='ql-formats'>
          <button type='button' className='ql-list' value='ordered'></button>
          <button type='button' className='ql-list' value='bullet'></button>
        </span>
        <span className='ql-formats'>
          <button className='ql-script' value='sub'></button>
          <button className='ql-script' value='super'></button>
        </span>
        <span className='ql-formats'>
          <button type='button' className='ql-indent' value='-1'></button>
          <button type='button' className='ql-indent' value='+1'></button>
        </span>
        <span className='ql-formats'>
          <select defaultValue='' className='ql-size'>
            <option value='small'></option>
            <option value=''></option>
            <option value='large'></option>
          </select>
          <select defaultValue='' className='ql-font'>
            <option value=''></option>
            <option value='serif'></option>
            <option value='monospace'></option>
          </select>
        </span>
        <span className='ql-formats'>
          <select defaultValue='' className="ql-color">
            <option value=''></option>
            <option value="#e60000"></option>
            <option value="#ff9900"></option>
            <option value="#ffff00"></option>
            <option value="#008a00"></option>
            <option value="#0066cc"></option>
            <option value="#9933ff"></option>
            <option value="#ffffff"></option>
            <option value="#facccc"></option>
            <option value="#ffebcc"></option>
            <option value="#ffffcc"></option>
            <option value="#cce8cc"></option>
            <option value="#cce0f5"></option>
            <option value="#ebd6ff"></option>
            <option value="#bbbbbb"></option>
            <option value="#f06666"></option>
            <option value="#ffc266"></option>
            <option value="#ffff66"></option>
            <option value="#66b966"></option>
            <option value="#66a3e0"></option>
            <option value="#c285ff"></option>
            <option value="#888888"></option>
            <option value="#a10000"></option>
            <option value="#b26b00"></option>
            <option value="#b2b200"></option>
            <option value="#006100"></option>
            <option value="#0047b2"></option>
            <option value="#6b24b2"></option>
            <option value="#444444"></option>
            <option value="#5c0000"></option>
            <option value="#663d00"></option>
            <option value="#666600"></option>
            <option value="#003700"></option>
            <option value="#002966"></option>
            <option value="#3d1466"></option>
          </select>
          <select defaultValue='' className="ql-background">
            <option value="#000000"></option>
            <option value="#e60000"></option>
            <option value="#ff9900"></option>
            <option value="#ffff00"></option>
            <option value="#008a00"></option>
            <option value="#0066cc"></option>
            <option value="#9933ff"></option>
            <option value=''></option>
            <option value="#facccc"></option>
            <option value="#ffebcc"></option>
            <option value="#ffffcc"></option>
            <option value="#cce8cc"></option>
            <option value="#cce0f5"></option>
            <option value="#ebd6ff"></option>
            <option value="#bbbbbb"></option>
            <option value="#f06666"></option>
            <option value="#ffc266"></option>
            <option value="#ffff66"></option>
            <option value="#66b966"></option>
            <option value="#66a3e0"></option>
            <option value="#c285ff"></option>
            <option value="#888888"></option>
            <option value="#a10000"></option>
            <option value="#b26b00"></option>
            <option value="#b2b200"></option>
            <option value="#006100"></option>
            <option value="#0047b2"></option>
            <option value="#6b24b2"></option>
            <option value="#444444"></option>
            <option value="#5c0000"></option>
            <option value="#663d00"></option>
            <option value="#666600"></option>
            <option value="#003700"></option>
            <option value="#002966"></option>
            <option value="#3d1466"></option>
          </select>
          <select defaultValue='' className="ql-align">
            <option value=''></option>
            <option value="center"></option>
            <option value="right"></option>
            <option value="justify"></option>
          </select>
        </span>
      </div>
    )
  }