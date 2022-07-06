### app模块导入
app模块导入是为了注册模块的单例及路由

### 报错1
    Nest can't resolve dependencies of the AuthService (?, JwtService). Please make sure that the argument UserService at index [0] is available in the AuthModule context.

代表 AuthService 这个模快在构造函数使用了 UserService，但是没有在 imports 中或者 providers 中导入或者这些模块导入了但是在 UserService 没有 exports 导出

### 报错2
    Nest cannot export a provider/module that is not a part of the currently processed module (AuthModule). Please verify whether the exported FileService is available in this particular context.

代表模块导出了，但是在AuthModule模块并没有imports导入或者providers中使用

skvnsoajdzsdbfhb

